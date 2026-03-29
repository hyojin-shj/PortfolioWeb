import { prisma } from '@/lib/db';
import { Project, AboutMe } from '@prisma/client';
import AdminDashboard from './AdminDashboard';
import { cookies } from 'next/headers';

export const revalidate = 0; // Disable static caching so admin changes appear immediately
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const isLogged = session?.value === 'true';

  let projects: Project[] = [];
  let aboutMe: AboutMe | null = null;
  if (isLogged) {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    aboutMe = await prisma.aboutMe.findFirst() || null;
  }

  return (
    <main>
      <AdminDashboard initialSession={isLogged} projects={projects} initialAboutMe={aboutMe} />
    </main>
  );
}
