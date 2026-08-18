export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900">Card 1</h2>
            <p className="text-gray-600">Welcome to your dashboard</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900">Card 2</h2>
            <p className="text-gray-600">Manage your content here</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900">Card 3</h2>
            <p className="text-gray-600">View your analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
