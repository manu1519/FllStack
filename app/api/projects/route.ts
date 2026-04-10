import { NextResponse } from 'next/server';

export async function GET() {
  const projects = [
    { id: 1, title: "Microcontroller STM32 Project", tech: "C++, Embedded" },
    { id: 2, title: "Cloud Automation API", tech: "Node.js, AWS" },
    { id: 3, title: "Docker Workflow n8n", tech: "YAML, Docker" }
  ];

  return NextResponse.json(projects);
}