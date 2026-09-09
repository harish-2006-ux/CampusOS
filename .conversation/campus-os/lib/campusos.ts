export type CampusRole = 'student' | 'recruiter' | 'officer'

export type CampusModule = {
  id: string
  label: string
  description: string
  href: string
  roles: CampusRole[]
  icon: string
}

export const campusRoles: { id: CampusRole; label: string; description: string }[] = [
  { id: 'student', label: 'Student', description: 'Build skills, discover opportunities, and get placement ready.' },
  { id: 'recruiter', label: 'Recruiter', description: 'Find, assess, and hire your next cohort of talent.' },
  { id: 'officer', label: 'Placement Officer', description: 'Coordinate campus outcomes across students and companies.' },
]

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
]

export const recruiterModules: CampusModule[] = [
  { id: 'recruiter-dashboard', label: 'Dashboard', description: 'Your hiring command center.', href: '/recruiter', roles: ['recruiter'], icon: 'layout-dashboard' },
  { id: 'create-job', label: 'Create Job', description: 'Open a role and define the signal.', href: '/recruiter/jobs/new', roles: ['recruiter'], icon: 'briefcase-business' },
  { id: 'candidate-search', label: 'Candidate Search', description: 'Find students matched to your roles.', href: '/recruiter/candidates', roles: ['recruiter'], icon: 'search' },
  { id: 'hiring-pipeline', label: 'Hiring Pipeline', description: 'Move great candidates forward.', href: '/recruiter/pipeline', roles: ['recruiter'], icon: 'kanban' },
]

export const officerModules: CampusModule[] = [
  { id: 'officer-dashboard', label: 'Dashboard', description: 'A pulse on campus outcomes.', href: '/officer', roles: ['officer'], icon: 'layout-dashboard' },
  { id: 'students', label: 'Students', description: 'Support every student journey.', href: '/officer/students', roles: ['officer'], icon: 'users' },
  { id: 'companies', label: 'Companies', description: 'Build strong employer partnerships.', href: '/officer/companies', roles: ['officer'], icon: 'building-2' },
  { id: 'reports', label: 'Reports', description: 'Turn placement activity into insight.', href: '/officer/reports', roles: ['officer'], icon: 'file-chart-column' },
]

export const roleModules: Record<CampusRole, CampusModule[]> = {
  student: campusModules,
  recruiter: recruiterModules,
  officer: officerModules,
}

export const careerSignals = {
  codingScore: 'Coding performance contributes to placement readiness and company recommendations.',
  skills: 'Verified skills influence eligibility, AI recommendations, and resume suggestions.',
  applications: 'Applications connect directly to assessments, interviews, selection status, and analytics.',
} as const

export const productFlow = ['Build Profile', 'Develop Skills', 'Practice Code', 'Apply to Companies', 'Take Assessments', 'Attend Interviews', 'Get Selected'] as const

export function getModulesForRole(role: CampusRole) {
  return roleModules[role]
}

export function getModuleById(id: string) {
  return [...campusModules, ...recruiterModules, ...officerModules].find((module) => module.id === id)
}
