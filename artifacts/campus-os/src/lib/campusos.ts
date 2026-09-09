export type CampusRole = 'student' | 'recruiter' | 'officer';

export type CampusModule = {
  id: string;
  label: string;
  description: string;
  href: string;
  roles: CampusRole[];
  icon: string;
};

export const campusModules: CampusModule[] = [
  { id: 'overview', label: 'Overview', description: 'Your career command center.', href: '/', roles: ['student'], icon: 'layout-dashboard' },
  { id: 'placements', label: 'Placements', description: 'Discover and manage opportunities.', href: '/placements', roles: ['student', 'recruiter', 'officer'], icon: 'briefcase-business' },
  { id: 'codelab', label: 'CodeLab', description: 'Practice for the interviews that matter.', href: '/codelab', roles: ['student'], icon: 'code-2' },
  { id: 'assessments', label: 'Assessments', description: 'Prepare, run, and review assessments.', href: '/assessments', roles: ['student', 'recruiter', 'officer'], icon: 'list-checks' },
  { id: 'resume', label: 'Resume', description: 'Turn your work into a strong first impression.', href: '/resume', roles: ['student'], icon: 'book-open' },
  { id: 'skills', label: 'Skills', description: 'Build a profile that gets noticed.', href: '/skills', roles: ['student'], icon: 'target' },
  { id: 'analytics', label: 'Analytics', description: 'See the signals behind career progress.', href: '/analytics', roles: ['student', 'recruiter', 'officer'], icon: 'line-chart' },
  { id: 'leaderboard', label: 'Leaderboard', description: 'Track momentum with your cohort.', href: '/leaderboard', roles: ['student'], icon: 'trophy' },
  { id: 'ai-mentor', label: 'AI Mentor', description: 'A clearer next step, whenever you need it.', href: '/mentor', roles: ['student'], icon: 'brain-circuit' },
];