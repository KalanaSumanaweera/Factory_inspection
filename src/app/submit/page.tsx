// src/app/submit/page.tsx
import { supabase } from "../../lib/supabase";
import InspectionForm from "./InspectionForm";

export default async function SubmitPage() {
  const { data: factories, error: factoriesError } = await supabase
    .from("factories")
    .select("*")
    .order("id", { ascending: true });

  const { data: inspectionTypes, error: typesError } = await supabase
    .from("inspection_types")
    .select("*")
    .order("id", { ascending: true });

  if (factoriesError || typesError) {
    console.error("Error fetching data:", factoriesError || typesError);
    return <div className="p-4 text-red-500">Error loading form data</div>;
  }

  return <InspectionForm factories={factories} inspectionTypes={inspectionTypes} />;
}