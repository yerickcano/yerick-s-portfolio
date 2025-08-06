export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "HTML5/CSS3", level: 95 }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "MongoDB", level: 70 },
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 65 }
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "Vercel", level: 85 },
        { name: "Figma", level: 75 },
        { name: "VS Code", level: 95 }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Here are the technologies and tools I work with to bring ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              {category.title}
            </h2>
            
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Skills Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Other Skills & Interests
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Responsive Design",
            "Performance Optimization",
            "Testing (Jest, Cypress)",
            "Agile Methodologies",
            "UI/UX Design",
            "SEO Optimization",
            "Progressive Web Apps",
            "Accessibility (a11y)"
          ].map((skill, index) => (
            <div
              key={index}
              className="bg-gray-100 text-center py-3 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Section */}
      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Currently Learning
        </h2>
        <p className="text-center text-gray-600 mb-6">
          I believe in continuous learning and staying up-to-date with the latest technologies.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["Three.js", "React Native", "Kubernetes", "Machine Learning"].map((tech, index) => (
            <span
              key={index}
              className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}