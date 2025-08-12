export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">About Me</h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Learn more about my background, skills, and passion for creating amazing web experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">My Story</h2>
          <div className="space-y-4 text-secondary">
            <p>
              I'm a passionate web developer with expertise in modern technologies like React, Next.js, 
              and Tailwind CSS. I love creating user-friendly applications that solve real-world problems.
            </p>
            <p>
              With a background in both frontend and backend development, I enjoy working on full-stack 
              projects that challenge me to learn and grow as a developer.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring new technologies, contributing to open source 
              projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>

        <div className="bg-surface border border-theme p-8 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-4">Quick Facts</h3>
          <ul className="space-y-3 text-secondary">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              Full-stack Developer
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              React & Next.js Enthusiast
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              Open Source Contributor
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              Problem Solver
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
