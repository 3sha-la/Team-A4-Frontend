export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Your App</h1>
          <p className="text-xl text-gray-600 mb-8">Start building amazing things today</p>
          <a
            href="/login"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
