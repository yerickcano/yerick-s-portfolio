export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Get In Touch</h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          I'd love to hear from you! Whether you have a project in mind or just want to connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">Send a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-theme rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-primary"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-theme rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-theme rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="What's this about?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 border border-theme rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell me about your project or just say hello!"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">Let's Connect</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">Email</h3>
                <p className="text-gray-600">your@email.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-xl">💼</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">LinkedIn</h3>
                <a href="https://linkedin.com" className="text-blue-600 hover:text-blue-800">
                  Connect with me
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-xl">🐙</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">GitHub</h3>
                <a href="https://github.com" className="text-blue-600 hover:text-blue-800">
                  Check out my code
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary mb-2">Response Time</h3>
            <p className="text-gray-600 text-sm">
              I typically respond to messages within 24 hours. For urgent inquiries, 
              feel free to reach out via LinkedIn for a faster response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}