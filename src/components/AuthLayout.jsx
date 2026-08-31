export default function AuthLayout({ children, title }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {title && <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h1>}
        {children}
      </div>
    </div>
  );
}
