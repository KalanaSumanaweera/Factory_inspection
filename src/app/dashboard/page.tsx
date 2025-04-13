// src/app/dashboard/page.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function calculateDamagedPercentage(selectedQuantity: number, failQuantity: number): number {
  if (selectedQuantity === 0) return 0;
  return (failQuantity / selectedQuantity) * 100;
}

function calculateOverallRating(findings: { rating: number }[]): number {
  if (findings.length === 0) return 0;
  const totalRating = findings.reduce((sum, finding) => sum + finding.rating, 0);
  return totalRating / findings.length;
}

const COLORS = ['#34D399', '#FBBF24', '#F87171'];

export default function Dashboard() {
  const [inspections, setInspections] = useState<any[]>([]);

  useEffect(() => {
    const fetchInspections = async () => {
      const { data, error } = await supabase
        .from("inspections")
        .select(`
          *,
          factories(name),
          inspection_findings(rating)
        `)
        .order("inspected_at", { ascending: false });

      if (error) {
        console.error("Error fetching inspections:", error);
        return;
      }

      // Transform data to match expected format
      const formattedData = data.map((inspection) => ({
        ...inspection,
        factory: { name: inspection.factories.name },
        findings: inspection.inspection_findings,
      }));

      setInspections(formattedData);
    };
    fetchInspections();
  }, []);

  const chartDataByFactory = inspections.reduce((acc, inspection) => {
    const factoryName = inspection.factory.name;
    const entry = acc.find((a) => a.name === factoryName);
    if (entry) {
      entry.count += 1;
    } else {
      acc.push({ name: factoryName, count: 1 });
    }
    return acc;
  }, []);

  const pieData = [
    {
      name: 'Low Damage',
      value: inspections.filter((i) => calculateDamagedPercentage(i.selected_quantity, i.fail_quantity) < 5).length,
    },
    {
      name: 'Medium Damage',
      value: inspections.filter((i) => {
        const dmg = calculateDamagedPercentage(i.selected_quantity, i.fail_quantity);
        return dmg >= 5 && dmg < 15;
      }).length,
    },
    {
      name: 'High Damage',
      value: inspections.filter((i) => calculateDamagedPercentage(i.selected_quantity, i.fail_quantity) >= 15).length,
    },
  ];

  const lineChartData = inspections
    .map((i) => ({
      date: new Date(i.inspected_at).toLocaleDateString(),
      rating: calculateOverallRating(i.findings),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inspection Dashboard</h1>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Inspections per Factory</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartDataByFactory}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Damage Level Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Average Rating Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* INSPECTION TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full table-auto text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">Factory</th>
              <th className="px-4 py-3">Inspected At</th>
              <th className="px-4 py-3">Barcode</th>
              <th className="px-4 py-3">Person</th>
              <th className="px-4 py-3">Style</th>
              <th className="px-4 py-3">Selected Qty</th>
              <th className="px-4 py-3">Fail Qty</th>
              <th className="px-4 py-3">Damage %</th>
              <th className="px-4 py-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((inspection) => {
              const damagedPercentage = calculateDamagedPercentage(
                inspection.selected_quantity,
                inspection.fail_quantity
              );
              const overallRating = calculateOverallRating(inspection.findings);

              return (
                <tr
                  key={inspection.id}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{inspection.factory.name}</td>
                  <td className="px-4 py-3">
                    {new Date(inspection.inspected_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{inspection.barcode_number}</td>
                  <td className="px-4 py-3">{inspection.respective_person}</td>
                  <td className="px-4 py-3">{inspection.style_number}</td>
                  <td className="px-4 py-3">{inspection.selected_quantity}</td>
                  <td className="px-4 py-3">{inspection.fail_quantity}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        damagedPercentage >= 15
                          ? 'bg-red-100 text-red-800'
                          : damagedPercentage >= 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {damagedPercentage.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        overallRating >= 4
                          ? 'bg-green-100 text-green-800'
                          : overallRating >= 2.5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {overallRating.toFixed(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}