import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { DashboardHome } from './pages/DashboardHome';
import { ProfileManager } from './pages/ProfileManager';
import { ProjectsManager } from './pages/ProjectsManager';
import { SkillsManager } from './pages/SkillsManager';
import { ExperienceManager } from './pages/ExperienceManager';
import { EducationManager } from './pages/EducationManager';
import { CertificationsManager } from './pages/CertificationsManager';

const pages: Record<string, () => React.JSX.Element> = {
  dashboard: DashboardHome,
  profile: ProfileManager,
  projects: ProjectsManager,
  skills: SkillsManager,
  experience: ExperienceManager,
  education: EducationManager,
  certifications: CertificationsManager,
};

export function AdminApp() {
  const { isAuthenticated, loading } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const PageComponent = pages[activePage] || DashboardHome;

  return (
    <AdminLayout activePage={activePage} onNavigate={setActivePage}>
      <PageComponent />
    </AdminLayout>
  );
}
