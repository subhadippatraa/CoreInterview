export interface Section {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const sections: Section[] = [
  { id: 'csharp', name: 'C# Fundamentals', description: 'Types, OOP, LINQ, async/await', icon: 'csharp' },
  { id: 'dotnet', name: '.NET Internals', description: 'CLR, JIT, Memory, Assemblies', icon: 'dotnet' },
  { id: 'architecture', name: 'Architecture & Patterns', description: 'SOLID, CQRS, Clean Architecture', icon: 'architecture' },
  { id: 'aspnet', name: 'ASP.NET Core', description: 'Middleware, DI, routing, APIs', icon: 'aspnet' },
  { id: 'efcore', name: 'EF Core', description: 'ORM, loading, migrations, queries', icon: 'efcore' },
  { id: 'sql', name: 'SQL Mastery', description: 'Joins, Queries, Window Functions, Keys', icon: 'dbms' },
  { id: 'dbms', name: 'DBMS Concepts', description: 'Architecture, Normalization, ACID', icon: 'dbms' },
  { id: 'os', name: 'Operating Systems', description: 'Processes, threads, memory', icon: 'os' },
  { id: 'networking', name: 'Networking Basics', description: 'TCP/IP, HTTP, DNS, REST', icon: 'networking' },
  { id: 'systemdesign', name: 'System Design', description: 'Scaling, caching, load balancing', icon: 'systemdesign' },
  { id: 'devops', name: 'DevOps & Docker', description: 'Containers, CI/CD, deployment', icon: 'devops' },
];
