// src/app/api/inspections/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("inspections")
      .select(`
        *,
        factories(name),
        inspection_findings(
          *,
          inspection_types(name)
        )
      `)
      .order("inspected_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch inspections" }, { status: 500 });
    }

    // Transform data to match frontend expectations
    const formattedData = data.map((inspection) => ({
      ...inspection,
      factory: { name: inspection.factories.name },
      findings: inspection.inspection_findings.map((finding: any) => ({
        ...finding,
        inspectionType: { name: finding.inspection_types.name },
      })),
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching inspections:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      factoryId,
      inspectedAt,
      barcodeNumber,
      respectivePerson,
      styleNumber,
      selectedQuantity,
      failQuantity,
      findings,
    } = data;

    // Validate input
    if (
      !factoryId ||
      !inspectedAt ||
      !barcodeNumber ||
      !respectivePerson ||
      !styleNumber ||
      !selectedQuantity ||
      !failQuantity ||
      !Array.isArray(findings)
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Insert inspection
    const { data: inspection, error: inspectionError } = await supabase
      .from("inspections")
      .insert({
        factory_id: factoryId,
        inspected_at: new Date(inspectedAt),
        barcode_number: barcodeNumber,
        respective_person: respectivePerson,
        style_number: styleNumber,
        selected_quantity: selectedQuantity,
        fail_quantity: failQuantity,
      })
      .select()
      .single();

    if (inspectionError) {
      console.error("Supabase error:", inspectionError);
      return NextResponse.json({ error: "Failed to create inspection" }, { status: 500 });
    }

    // Insert findings
    const findingsData = findings.map((finding: { inspectionTypeId: number; rating: number }) => ({
      inspection_id: inspection.id,
      inspection_type_id: finding.inspectionTypeId,
      rating: finding.rating,
    }));

    const { error: findingsError } = await supabase
      .from("inspection_findings")
      .insert(findingsData);

    if (findingsError) {
      console.error("Supabase error:", findingsError);
      return NextResponse.json({ error: "Failed to create findings" }, { status: 500 });
    }

    // Fetch the complete inspection for response
    const { data: fullInspection } = await supabase
      .from("inspections")
      .select(`
        *,
        factories(name),
        inspection_findings(
          *,
          inspection_types(name)
        )
      `)
      .eq("id", inspection.id)
      .single();

    const formattedInspection = {
      ...fullInspection,
      factory: { name: fullInspection.factories.name },
      findings: fullInspection.inspection_findings.map((finding: any) => ({
        ...finding,
        inspectionType: { name: finding.inspection_types.name },
      })),
    };

    return NextResponse.json(formattedInspection, { status: 201 });
  } catch (error) {
    console.error("Error creating inspection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}