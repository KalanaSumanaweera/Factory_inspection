// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function InspectionForm({
//   factories,
//   inspectionTypes,
// }: {
//   factories: any[];
//   inspectionTypes: any[];
// }) {
//   const [factoryId, setFactoryId] = useState('');
//   const [inspectedAt, setInspectedAt] = useState(
//     new Date().toISOString().slice(0, 16) // default current datetime
//   );
//   const [barcodeNumber, setBarcodeNumber] = useState('');
//   const [respectivePerson, setRespectivePerson] = useState('');
//   const [styleNumber, setStyleNumber] = useState('');
//   const [selectedQuantity, setSelectedQuantity] = useState('');
//   const [failQuantity, setFailQuantity] = useState('');
//   const [findings, setFindings] = useState(
//     inspectionTypes.map((type: any) => ({
//       inspectionTypeId: type.id,
//       rating: 0,
//     }))
//   );

//   const router = useRouter();

//   const handleRatingChange = (typeId: number, rating: number) => {
//     setFindings((prev) =>
//       prev.map((finding) =>
//         finding.inspectionTypeId === typeId
//           ? { ...finding, rating }
//           : finding
//       )
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!inspectedAt || isNaN(Date.parse(inspectedAt))) {
//       alert('Please provide a valid inspection date.');
//       return;
//     }

//     const data = {
//       factoryId: parseInt(factoryId),
//       inspectedAt: new Date(inspectedAt),
//       barcodeNumber: barcodeNumber.trim(),
//       respectivePerson: respectivePerson.trim(),
//       styleNumber: styleNumber.trim(),
//       selectedQuantity: parseInt(selectedQuantity),
//       failQuantity: parseInt(failQuantity),
//       findings,
//     };

//     if (
//       !data.factoryId ||
//       isNaN(data.selectedQuantity) ||
//       isNaN(data.failQuantity) ||
//       !data.barcodeNumber ||
//       !data.respectivePerson ||
//       !data.styleNumber
//     ) {
//       alert('Please fill out all required fields correctly.');
//       return;
//     }

//     const res = await fetch('/api/inspections', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });

//     if (res.ok) {
//       router.push('/dashboard');
//     } else {
//       const err = await res.text();
//       console.error(err);
//       alert('Submission failed');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-6">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Submit Inspection</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Factory */}
//         <div>
//           <label className="block font-semibold mb-1 text-gray-700">Factory</label>
//           <select
//             value={factoryId}
//             onChange={(e) => setFactoryId(e.target.value)}
//             className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           >
//             <option value="">Select Factory</option>
//             {factories.map((factory) => (
//               <option key={factory.id} value={factory.id}>
//                 {factory.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Inspected At */}
//         <div>
//           <label className="block font-semibold mb-1 text-gray-700">Inspected At</label>
//           <input
//             type="datetime-local"
//             value={inspectedAt}
//             onChange={(e) => setInspectedAt(e.target.value)}
//             className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         {/* Basic Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-semibold mb-1 text-gray-700">Barcode Number</label>
//             <input
//               type="text"
//               value={barcodeNumber}
//               onChange={(e) => setBarcodeNumber(e.target.value)}
//               className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-1 text-gray-700">Respective Person</label>
//             <input
//               type="text"
//               value={respectivePerson}
//               onChange={(e) => setRespectivePerson(e.target.value)}
//               className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-1 text-gray-700">Style Number</label>
//             <input
//               type="text"
//               value={styleNumber}
//               onChange={(e) => setStyleNumber(e.target.value)}
//               className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-1 text-gray-700">Selected Quantity</label>
//             <input
//               type="number"
//               value={selectedQuantity}
//               onChange={(e) => setSelectedQuantity(e.target.value)}
//               className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-1 text-gray-700">Fail Quantity</label>
//             <input
//               type="number"
//               value={failQuantity}
//               onChange={(e) => setFailQuantity(e.target.value)}
//               className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//         </div>

//         {/* Findings Table */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-4">Inspection Findings</h2>
//           <div className="overflow-auto">
//             <table className="w-full border text-sm text-left text-gray-700">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-2 px-3 font-semibold">Inspection Type</th>
//                   {[0, 1, 2, 3, 4, 5].map((score) => (
//                     <th key={score} className="py-2 px-3 text-center font-semibold">{score}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {inspectionTypes.map((type: any) => {
//                   const selected = findings.find(f => f.inspectionTypeId === type.id)?.rating ?? 0;
//                   return (
//                     <tr key={type.id} className="border-t">
//                       <td className="py-2 px-3">{type.name}</td>
//                       {[0, 1, 2, 3, 4, 5].map((score) => (
//                         <td key={score} className="text-center py-2 px-3">
//                           <input
//                             type="radio"
//                             name={`rating-${type.id}`}
//                             value={score}
//                             checked={selected === score}
//                             onChange={() => handleRatingChange(type.id, score)}
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="text-center pt-4">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InspectionForm({
  factories,
  inspectionTypes,
}: {
  factories: any[];
  inspectionTypes: any[];
}) {
  const [factoryId, setFactoryId] = useState('');
  const [inspectedAt, setInspectedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [barcodeNumber, setBarcodeNumber] = useState('');
  const [respectivePerson, setRespectivePerson] = useState('');
  const [styleNumber, setStyleNumber] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [failQuantity, setFailQuantity] = useState('');
  const [issueCounts, setIssueCounts] = useState(
    inspectionTypes.map((type: any) => ({
      inspectionTypeId: type.id,
      issues: 0,
    }))
  );

  const router = useRouter();

  const convertIssueToRating = (issueCount: number): number => {
    if (issueCount === 0) return 5;
    if (issueCount <= 2) return 4;
    if (issueCount <= 4) return 3;
    if (issueCount <= 6) return 2;
    if (issueCount <= 8) return 1;
    return 0;
  };

  const handleIssueChange = (typeId: number, count: number) => {
    setIssueCounts((prev) =>
      prev.map((item) =>
        item.inspectionTypeId === typeId ? { ...item, issues: count } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const findings = issueCounts.map((item) => ({
      inspectionTypeId: item.inspectionTypeId,
      rating: convertIssueToRating(item.issues),
    }));

    const data = {
      factoryId: parseInt(factoryId),
      inspectedAt: new Date(inspectedAt),
      barcodeNumber: barcodeNumber.trim(),
      respectivePerson: respectivePerson.trim(),
      styleNumber: styleNumber.trim(),
      selectedQuantity: parseInt(selectedQuantity),
      failQuantity: parseInt(failQuantity),
      findings,
    };

    if (
      !data.factoryId ||
      isNaN(data.selectedQuantity) ||
      isNaN(data.failQuantity) ||
      !data.barcodeNumber ||
      !data.respectivePerson ||
      !data.styleNumber
    ) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    const res = await fetch('/api/inspections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const err = await res.text();
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Submit Inspection</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Factory */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Factory</label>
          <select
            value={factoryId}
            onChange={(e) => setFactoryId(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Factory</option>
            {factories.map((factory) => (
              <option key={factory.id} value={factory.id}>
                {factory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Inspected At */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Inspected At</label>
          <input
            type="datetime-local"
            value={inspectedAt}
            onChange={(e) => setInspectedAt(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Barcode Number</label>
            <input
              type="text"
              value={barcodeNumber}
              onChange={(e) => setBarcodeNumber(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">Respective Person</label>
            <input
              type="text"
              value={respectivePerson}
              onChange={(e) => setRespectivePerson(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">Style Number</label>
            <input
              type="text"
              value={styleNumber}
              onChange={(e) => setStyleNumber(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">Selected Quantity</label>
            <input
              type="number"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">Fail Quantity</label>
            <input
              type="number"
              value={failQuantity}
              onChange={(e) => setFailQuantity(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Findings Table */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-4">Inspection Findings (No. of Issues)</h2>
          <div className="overflow-auto">
            <table className="w-full border text-sm text-left text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 font-semibold">Inspection Type</th>
                  <th className="py-2 px-3 font-semibold text-center">Issue Count</th>
                </tr>
              </thead>
              <tbody>
                {inspectionTypes.map((type: any) => {
                  const value = issueCounts.find(f => f.inspectionTypeId === type.id)?.issues ?? 0;
                  return (
                    <tr key={type.id} className="border-t">
                      <td className="py-2 px-3">{type.name}</td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="number"
                          min={0}
                          value={value}
                          onChange={(e) => handleIssueChange(type.id, parseInt(e.target.value))}
                          className="w-20 text-center border rounded-md p-1 focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
