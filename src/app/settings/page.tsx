// src/app/settings/page.tsx
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { addFactory } from "../../actions/factoryActions";
import { supabase } from '../../lib/supabase';

export default async function Settings() {
  // const { userId } = auth();
  // if (!userId) {
  //   redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in");
  // }

  const { data: factories, error } = await supabase
    .from("factories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching factories:", error);
    return <div className="p-4 text-red-500">Error loading factories</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Settings
        </h1>

        {/* Add New Factory */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Add New Factory
          </h2>
          <form
            action={addFactory}
            className="p-6 bg-white rounded-xl shadow-md space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Factory Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 p-3 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter factory name"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              <PlusCircle className="w-5 h-5" />
              Add Factory
            </button>
          </form>
        </div>

        {/* Existing Factories */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Existing Factories
          </h2>
          {factories?.length === 0 ? (
            <p className="text-gray-500">No factories found.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {factories?.map((factory) => (
                <div
                  key={factory.id}
                  className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {factory.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}