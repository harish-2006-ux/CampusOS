// Career Twin — mock/sample data for the AI Career Operating System layer.
// All numbers are illustrative sample data for demo purposes.

export type GapLevel = 'strong' | 'moderate' | 'missing' | 'critical';

export type CareerDnaCategory = {
  key: string;
  label: string;
  score: number; // 0-100
  trend: number; // signed delta over the last 30 days
  group: 'Technical' | 'Human' | 'Track record';
};

export const careerReadinessScore = {
  score: 74,
  delta: 6,
  label: 'Placement ready in ~5 weeks at current pace',
};

export const codingReadiness = { score: 79, delta: 4 };
export const communicationScore = { score: 68, delta: 9 };
export const interviewReadiness = { score: 71, delta: 3 };
export const placementProbability = { score: 66, delta: 8 };

export const careerDna: CareerDnaCategory[] = [
  { key: 'technical-skills', label: 'Technical Skills', score: 78, trend: 5, group: 'Technical' },
  { key: 'dsa', label: 'DSA', score: 61, trend: 8, group: 'Technical' },
  { key: 'programming', label: 'Programming', score: 84, trend: 2, group: 'Technical' },
  { key: 'database', label: 'Database', score: 72, trend: 6, group: 'Technical' },
  { key: 'web-development', label: 'Web Development', score: 58, trend: 1, group: 'Technical' },
  { key: 'system-design', label: 'System Design', score: 34, trend: 3, group: 'Technical' },
  { key: 'communication', label: 'Communication', score: 68, trend: 9, group: 'Human' },
  { key: 'leadership', label: 'Leadership', score: 55, trend: 4, group: 'Human' },
  { key: 'projects', label: 'Projects', score: 88, trend: 3, group: 'Track record' },
  { key: 'resume', label: 'Resume', score: 82, trend: 11, group: 'Track record' },
  { key: 'interview', label: 'Interview', score: 71, trend: 3, group: 'Human' },
  { key: 'academics', label: 'Academics', score: 83, trend: 0, group: 'Track record' },
  { key: 'certifications', label: 'Certifications', score: 64, trend: 7, group: 'Track record' },
  { key: 'internships', label: 'Internships', score: 70, trend: 0, group: 'Track record' },
];

export type SkillRequirement = { skill: string; required: number; current: number };
export type TargetRole = {
  id: string;
  role: string;
  requirements: SkillRequirement[];
};

export const targetRoles: TargetRole[] = [
  {
    id: 'software-engineer',
    role: 'Software Engineer',
    requirements: [
      { skill: 'Java', required: 75, current: 82 },
      { skill: 'DSA', required: 70, current: 61 },
      { skill: 'SQL', required: 65, current: 72 },
      { skill: 'Git', required: 60, current: 91 },
      { skill: 'System Design', required: 55, current: 34 },
    ],
  },
  {
    id: 'data-analyst',
    role: 'Data Analyst',
    requirements: [
      { skill: 'SQL', required: 80, current: 72 },
      { skill: 'Python', required: 70, current: 80 },
      { skill: 'Power BI / Tableau', required: 70, current: 76 },
      { skill: 'Statistics', required: 65, current: 58 },
      { skill: 'Data Storytelling', required: 60, current: 68 },
    ],
  },
  {
    id: 'business-analyst',
    role: 'Business Analyst',
    requirements: [
      { skill: 'SQL', required: 65, current: 72 },
      { skill: 'Excel / Sheets', required: 70, current: 74 },
      { skill: 'Stakeholder Comms', required: 70, current: 68 },
      { skill: 'Process Mapping', required: 55, current: 42 },
      { skill: 'Dashboarding', required: 60, current: 76 },
    ],
  },
];

export function gapLevel(req: SkillRequirement): GapLevel {
  const diff = req.current - req.required;
  if (diff >= 10) return 'strong';
  if (diff >= -5) return 'moderate';
  if (diff >= -25) return 'missing';
  return 'critical';
}

export type Mission = {
  id: string;
  code: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estMinutes: number;
  skills: string[];
  xp: number;
  readinessBoost: { area: string; percent: number };
  status: 'available' | 'in-progress' | 'completed';
};

export const missions: Mission[] = [
  {
    id: 'm08',
    code: 'MISSION 08',
    title: 'Design a scalable student authentication service',
    description: 'Sketch the auth flow, data model, and failure modes for a service handling 50k concurrent logins.',
    difficulty: 3,
    estMinutes: 120,
    skills: ['System Design', 'Java', 'SQL'],
    xp: 140,
    readinessBoost: { area: 'System Design', percent: 6 },
    status: 'available',
  },
  {
    id: 'm09',
    code: 'MISSION 09',
    title: 'Build a REST API with authentication',
    description: 'Ship a Spring Boot service with JWT auth, role checks, and a Postgres-backed user store.',
    difficulty: 3,
    estMinutes: 120,
    skills: ['Java', 'Spring Boot', 'SQL'],
    xp: 120,
    readinessBoost: { area: 'Backend', percent: 4 },
    status: 'in-progress',
  },
  {
    id: 'm10',
    code: 'MISSION 10',
    title: 'Solve 5 graph traversal problems back to back',
    description: 'Close the biggest DSA gap with a focused BFS/DFS repetition block.',
    difficulty: 2,
    estMinutes: 75,
    skills: ['DSA', 'Graphs'],
    xp: 90,
    readinessBoost: { area: 'DSA', percent: 5 },
    status: 'available',
  },
  {
    id: 'm11',
    code: 'MISSION 11',
    title: 'Rewrite your resume summary for Data Analytics roles',
    description: 'Tighten your summary to lead with SQL, dashboarding, and one quantified outcome.',
    difficulty: 1,
    estMinutes: 30,
    skills: ['Resume', 'Communication'],
    xp: 50,
    readinessBoost: { area: 'Resume', percent: 3 },
    status: 'completed',
  },
  {
    id: 'm12',
    code: 'MISSION 12',
    title: 'Record a 3-minute self-introduction and self-review it',
    description: 'Practice your intro against the STAR format, then log filler-word count.',
    difficulty: 1,
    estMinutes: 25,
    skills: ['Communication', 'Interview'],
    xp: 45,
    readinessBoost: { area: 'Communication', percent: 4 },
    status: 'available',
  },
];

export type InterviewMode = { id: string; label: string; description: string };
export const interviewModes: InterviewMode[] = [
  { id: 'technical', label: 'Technical Interview', description: 'DSA, system design, and role-specific technical rounds.' },
  { id: 'hr', label: 'HR Interview', description: 'Fit, expectations, offer-stage conversation practice.' },
  { id: 'behavioral', label: 'Behavioral Interview', description: 'STAR-format questions on past projects and conflict.' },
  { id: 'managerial', label: 'Managerial Interview', description: 'Ownership, prioritization, and cross-team scenarios.' },
  { id: 'group-discussion', label: 'Group Discussion', description: 'Structured GD practice on campus-hiring topics.' },
  { id: 'company-specific', label: 'Company-specific Interview', description: 'Tuned to a target company’s known interview pattern.' },
];

export type InterviewReport = {
  confidence: number;
  communication: number;
  technicalKnowledge: number;
  clarity: number;
  problemSolving: number;
  fillerWords: number;
  answerStructure: number;
  strengths: string[];
  weaknesses: string[];
  recommendedPractice: string;
  nextMission: string;
};

export const sampleInterviewReport: InterviewReport = {
  confidence: 72,
  communication: 66,
  technicalKnowledge: 80,
  clarity: 69,
  problemSolving: 77,
  fillerWords: 14,
  answerStructure: 63,
  strengths: ['Clear problem breakdown before coding', 'Strong grasp of time complexity trade-offs'],
  weaknesses: ['Answers wander before reaching the core point', 'Filler words increase under follow-up pressure'],
  recommendedPractice: 'Practice the STAR structure out loud for 10 minutes before your next mock round.',
  nextMission: 'Record a 3-minute self-introduction and self-review it',
};

export type CompanyFitBreakdown = {
  overallFit: number;
  skillMatch: number;
  codingMatch: number;
  projectMatch: number;
  resumeMatch: number;
  communication: number;
  interviewReadiness: number;
  missing: string[];
  predictedFitAfterMissions: number;
};

export type CompanyTarget = { id: string; company: string; role: string; fit: CompanyFitBreakdown };

export const companyFitTargets: CompanyTarget[] = [
  {
    id: 'technova-swe',
    company: 'TechNova',
    role: 'Software Engineer',
    fit: {
      overallFit: 76,
      skillMatch: 74,
      codingMatch: 81,
      projectMatch: 88,
      resumeMatch: 79,
      communication: 66,
      interviewReadiness: 71,
      missing: ['Advanced SQL', 'System Design', 'REST APIs'],
      predictedFitAfterMissions: 88,
    },
  },
  {
    id: 'cloudstack-analyst',
    company: 'CloudStack',
    role: 'Data Analyst',
    fit: {
      overallFit: 69,
      skillMatch: 71,
      codingMatch: 60,
      projectMatch: 75,
      resumeMatch: 82,
      communication: 68,
      interviewReadiness: 64,
      missing: ['Advanced Statistics', 'A/B Testing'],
      predictedFitAfterMissions: 81,
    },
  },
  {
    id: 'innovatelabs-ba',
    company: 'InnovateLabs',
    role: 'Business Analyst',
    fit: {
      overallFit: 63,
      skillMatch: 58,
      codingMatch: 40,
      projectMatch: 70,
      resumeMatch: 74,
      communication: 71,
      interviewReadiness: 60,
      missing: ['Process Mapping', 'Stakeholder Interviewing'],
      predictedFitAfterMissions: 77,
    },
  },
];

export type PlacementStage = {
  id: string;
  label: string;
  status: 'passed' | 'at-risk' | 'pending';
  detail: string;
};

export const placementSimulatorStages: PlacementStage[] = [
  { id: 'resume', label: 'Resume Screening', status: 'passed', detail: 'Cleared on keyword match and project depth.' },
  { id: 'aptitude', label: 'Aptitude', status: 'passed', detail: 'Scored in the 82nd percentile on quant and logical sections.' },
  { id: 'coding', label: 'Coding Assessment', status: 'at-risk', detail: 'Two of five problems timed out — graph and DP sections need repetition.' },
  { id: 'technical', label: 'Technical Interview', status: 'pending', detail: 'Unlocks once the coding assessment risk is cleared.' },
  { id: 'hr', label: 'HR Interview', status: 'pending', detail: 'Unlocks after the technical round.' },
];

export type TimelineEvent = { date: string; label: string; detail: string };
export const careerTimeline: TimelineEvent[] = [
  { date: 'Feb', label: 'Joined CampusOS', detail: 'Baseline Career Twin generated from academics and resume.' },
  { date: 'Apr', label: 'First 100 problems solved', detail: 'DSA score crossed 45%.' },
  { date: 'Jun', label: 'Smart Agriculture project shipped', detail: 'Projects score jumped to 81%.' },
  { date: 'Aug', label: 'Resume rewritten for Data Analytics', detail: 'Resume score rose to 82%.' },
  { date: 'Now', label: 'Preparing for placement season', detail: `Readiness at ${careerReadinessScore.score}%.` },
];

// Campus (admin/placement-cell) intelligence
export const campusIntelligence = {
  totalStudents: 612,
  placementReady: 214,
  nearReady: 268,
  highRisk: 130,
  avgReadiness: 68,
  avgInterviewScore: 71,
  avgCodingScore: 74,
  insights: [
    '183 students are technically ready but have weak interview performance.',
    '42 students are eligible for upcoming software roles but have not completed the required assessment.',
    'System Design is the top critical gap across 3rd-year Computer Science students.',
    'Communication scores rose 6% campus-wide after the last cohort of mock interviews.',
  ],
  departmentComparison: [
    { department: 'Computer Science', avgReadiness: 74, students: 210 },
    { department: 'Data Science (BCA)', avgReadiness: 71, students: 96 },
    { department: 'Electronics', avgReadiness: 61, students: 158 },
    { department: 'Mechanical', avgReadiness: 55, students: 148 },
  ],
  skillDemandVsSupply: [
    { skill: 'System Design', demand: 82, supply: 41 },
    { skill: 'SQL', demand: 76, supply: 68 },
    { skill: 'React', demand: 64, supply: 52 },
    { skill: 'Python', demand: 71, supply: 74 },
    { skill: 'Cloud Basics', demand: 58, supply: 30 },
  ],
  funnel: [
    { stage: 'Registered', count: 612 },
    { stage: 'Resume screened', count: 540 },
    { stage: 'Aptitude cleared', count: 401 },
    { stage: 'Technical interview', count: 289 },
    { stage: 'Offers', count: 156 },
  ],
};
