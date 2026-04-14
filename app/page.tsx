'use client';
import { useEffect, useState } from 'react';

interface Project {
  "Project Name": string;
  Description: string; // Asegúrate de que este nombre coincida con tu columna en Supabase
  tech_stack: string;   // <--- Agregamos esto a la interfaz
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando portafolio...</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Manuel | Mechatronic Engineer</h1>
          <p className="mt-4 text-xl text-gray-600">Cloud Support & Embedded Systems</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project["Project Name"]}</h3>
                
                {/* 1. DESCRIPCIÓN */}
                <p className="text-gray-600 text-sm mb-4">
                  {project.Description}
                </p>

                {/* 2. EL FRAGMENTO NUEVO (TECNOLOGÍAS) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack?.split(',').map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-gray-800 text-gray-100 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* 3. LÍNEA DIVISORIA Y BOTÓN */}
                <div className="pt-4 border-t border-gray-50 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Ver más →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
