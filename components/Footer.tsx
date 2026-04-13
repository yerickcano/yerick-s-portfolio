export default function Footer() {
  return (
    <footer className="py-8 px-5 sm:px-8 border-t border-white/50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Yerick Cano. All rights reserved.</p>
        <p>
          Built with{" "}
          <span className="text-cr-red font-semibold">Next.js</span> &amp;{" "}
          <span className="text-gray-600 font-semibold">Tailwind</span>
          {" · "}Deployed on{" "}
          <span className="text-gray-600 font-semibold">Vercel</span>
        </p>
      </div>
    </footer>
  );
}
