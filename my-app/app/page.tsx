import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Hi, I'm <span className="text-blue-600">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A passionate full-stack developer creating amazing web experiences with modern technologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View My Work
          </Link>
          <Link
            href="/contact"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What I Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Frontend Development</h3>
            <p className="text-gray-600">
              Creating beautiful, responsive user interfaces with React, Next.js, and modern CSS frameworks.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Backend Development</h3>
            <p className="text-gray-600">
              Building robust APIs and server-side applications with Node.js, databases, and cloud services.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Full-Stack Solutions</h3>
            <p className="text-gray-600">
              Delivering complete web applications from concept to deployment with modern best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}