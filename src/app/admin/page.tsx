import React from "react";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

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
};

export default AdminPage;
