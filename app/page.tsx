export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Manuel <span className="text-blue-500">_</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Cloud Support Engineer & FullStack Developer
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold hover:bg-blue-500 transition-colors">
            Ver Proyectos
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Contactar <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}

