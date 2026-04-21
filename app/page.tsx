'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Asegúrate de que esta ruta sea la correcta en tu proyecto

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. EFECTO PARA MODO OSCURO
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
    }
  }, [isDark]);

  // 2. FETCH DE DATOS DESDE SUPABASE
  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('TST') // Tu tabla de Supabase
        .select('*');
      
      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* BOTÓN FLOTANTE DE TEMA */}
      <button 
        type='button'
        onClick={() => {
          setIsDark(!isDark);
        }}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all group"
      >
        {isDark ? (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728L5.636 5.636" />
            <circle cx="12" cy="12" r="4" strokeWidth="2" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <main className="max-w-5xl mx-auto py-20 px-6">
        
        {/* HEADER ANIMADO */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter text-stone-950 dark:text-white">
            Manuel
          </h1>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] 
  text-subtitle border-b-2 border-subtitle/20 pb-2 inline-block transition-colors duration-300">
  Mechatronics Engineer | Cloud Support Engineer | Embedded Systems
          </p>
        </motion.header>

        {/* GRILLA DE PROYECTOS */}
        {loading ? (
          <div className="text-center font-mono text-sm animate-pulse">Cargando infraestructura...</div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10 }}
                className="flex flex-col h-full group relative bg-stone-100/30 dark:bg-stone-900/50 backdrop-blur-md p-8 rounded-3xl border border-stone-400/40 dark:border-stone-800 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-2xl font-bold mb-4 text-stone-950 dark:text-stone-50">
                  {project["Project Name"]}
                </h3>
                <p className="text-stone-900 dark:text-stone-200 text-sm leading-relaxed mb-8 font-bold flex-grow">
                  {project.Description} {/* Usando la columna 'Name' como descripción según tu configuración */}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech_stack?.split(',').map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-stone-900/10 dark:bg-stone-800 text-stone-900 dark:text-stone-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-stone-950/20">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* LINK A GITHUB CON ICONO REINTEGRADO */}
                <div className="mt-auto pt-6 border-t border-slate-300 dark:border-slate-800">
                  <a 
                    href={project.github_url || "#"} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors"
                  >
                    SOURCE CODE
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
