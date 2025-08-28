import React from "react";
import AdminHeader from "../_components/admin-header";

export default async function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AdminHeader />
      <main>
        <section className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p>
            Welcome to the admin panel. Here you can manage the application.
          </p>
        </section>

        <section className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <ul className="list-disc pl-5">
            <li>Manage Products</li>
            <li>Manage Services</li>
            <li>View Reports</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
