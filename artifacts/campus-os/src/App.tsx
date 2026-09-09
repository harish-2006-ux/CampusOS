import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Code2,
  Clock3,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  ListChecks,
  Menu,
  MessageSquare,
  Play,
  Search,
  Settings,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { campusModules, type CampusModule } from '@/lib/campusos';
import {
  codeProblems,
  companyTracks,
  mentorResponses,
  topicProgress,
  type CodeProblem,
  type Difficulty,
} from '@/lib/codelab-data';

type Icon = typeof LayoutDashboard;
type NavItem = Omit<CampusModule, 'icon'> & { icon: Icon };
type CodelabView = 'Dashboard' | 'Explore' | 'Progress' | 'Companies' | 'Mentor';

const moduleIcons: Record<string, Icon> = {
  'layout-dashboard': LayoutDashboard,
  'briefcase-business': BriefcaseBusiness,
  'code-2': Code2,
  'list-checks': ListChecks,
  'book-open': BookOpen,
  target: Target,
  'line-chart': LineChart,
  trophy: Trophy,
  'brain-circuit': BrainCircuit,
};
const navItems: NavItem[] = campusModules.map((module) => ({ ...module, icon: moduleIcons[module.icon] }));

function Logo() {
  return (
    <div className="brand-lockup">
      <div className="brand-mark"><GraduationCap size={19} /><span /></div>
      <div><p className="brand-name">Campus<span>OS</span></p><p className="brand-caption">Career operating system</p></div>
    </div>
  );
}

function HeroExperience({ onEnter }: { onEnter: () => void }) {
  const [ready, setReady] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 450);
    const onMove = (event: MouseEvent) => setParallax({ x: (event.clientX / window.innerWidth - 0.5) * 8, y: (event.clientY / window.innerHeight - 0.5) * 5 });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener('mousemove', onMove); };
  }, []);
  return (
    <section className="hero-shell" aria-label="CampusOS introduction">
      <div className="hero-atmosphere" style={{ transform: `translate3d(${parallax.x * 0.45}px,${parallax.y * 0.45}px,0)` }} />
      <div className="hero-grid" /><div className="hero-architecture hero-architecture-left" /><div className="hero-architecture hero-architecture-right" />
      <div className="hero-particle hero-particle-one" /><div className="hero-particle hero-particle-two" /><div className="hero-particle hero-particle-three" />
      <div className="hero-kicker">CAMPUSOS <span /> CAREER OPERATING SYSTEM</div>
      <div className="hero-wordmark"><span className="hero-wordmark-shadow">Campus<span>OS</span></span><span className="hero-wordmark-face">Campus<span>OS</span></span><p>The operating system for student careers.</p></div>
      <div className={`hero-student ${ready ? 'hero-student-active' : ''}`} style={{ transform: `translate3d(${parallax.x}px,${parallax.y}px,0)` }}><img src="/campusos-student.png" alt="Student building momentum with CampusOS" /></div>
      <div className="hero-copy"><span className="hero-status-dot" />Initializing your career workspace...</div>
      <div className="hero-cta-row"><button data-testid="button-enter-campusos" onClick={onEnter} className="hero-enter-button">Explore CampusOS <ArrowUpRight size={15} /></button><span>Placements · CodeLab · Career Analytics</span></div>
    </section>
  );
}

function Sidebar({ active, setActive, open, setOpen }: { active: string; setActive: (value: string) => void; open: boolean; setOpen: (value: boolean) => void }) {
  return (
    <aside className={`app-sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><Logo /><button data-testid="button-close-navigation" className="icon-button sidebar-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={16} /></button></div>
      <div className="sidebar-label">Workspace</div>
      <nav className="sidebar-nav" aria-label="Student workspace">
        {navItems.map(({ id, label, description, icon: IconComp }) => (
          <button data-testid={`nav-${id}`} key={id} title={description} onClick={() => { setActive(label); setOpen(false); }} className={`nav-item ${active === label ? 'nav-item-active' : ''}`}>
            <IconComp size={17} /><span>{label}</span>{label === 'CodeLab' && <span className={`new-badge ${active === label ? 'new-badge-active' : ''}`}>New</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-rule" />
      <button data-testid="button-settings" className="nav-item nav-settings" onClick={() => setActive('Settings')}><Settings size={17} /><span>Settings</span></button>
      <div className="profile-card"><div className="profile-row"><div className="avatar">HM</div><div className="profile-copy"><p>Harsh V. M</p><span>Computer Science Student</span></div><ChevronDown size={14} className="profile-chevron" /></div><div className="readiness"><span />Placement Ready</div></div>
    </aside>
  );
}

function Header({ setOpen, query, setQuery }: { setOpen: (value: boolean) => void; query: string; setQuery: (value: string) => void }) {
  return (
    <header className="app-header">
      <div className="header-left"><button data-testid="button-open-navigation" className="icon-button mobile-menu" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={17} /></button><div className="global-search"><Search size={15} /><input data-testid="input-global-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search problems, topics, companies..." aria-label="Search problems, topics, companies" /><span className="search-key">⌘ K</span></div></div>
      <div className="header-actions"><button data-testid="button-notifications" className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><span /></button><button data-testid="button-messages" className="icon-button" aria-label="Messages"><MessageSquare size={18} /></button><div className="header-profile"><div className="avatar avatar-small">HM</div><ChevronDown size={13} /></div></div>
    </header>
  );
}

function CodelabTabs({ view, setView }: { view: CodelabView; setView: (view: CodelabView) => void }) {
  const tabs: { label: CodelabView; icon: Icon }[] = [
    { label: 'Dashboard', icon: LayoutDashboard }, { label: 'Explore', icon: Search }, { label: 'Progress', icon: LineChart }, { label: 'Companies', icon: BriefcaseBusiness }, { label: 'Mentor', icon: BrainCircuit },
  ];
  return <nav className="codelab-tabs" aria-label="CodeLab sections">{tabs.map(({ label, icon: TabIcon }) => <button data-testid={`tab-codelab-${label.toLowerCase()}`} key={label} onClick={() => setView(label)} className={`codelab-tab ${view === label ? 'codelab-tab-active' : ''}`}><TabIcon size={14} />{label}</button>)}</nav>;
}

function PageHeading({ view, setView, onExplore }: { view: CodelabView; setView: (view: CodelabView) => void; onExplore: () => void }) {
  const copy: Record<CodelabView, { eyebrow: string; title: string; text: string }> = {
    Dashboard: { eyebrow: 'CodeLab workspace', title: 'Build your interview edge.', text: 'Practice with intention, spot your gaps, and turn every solved problem into placement momentum.' },
    Explore: { eyebrow: 'Problem explorer', title: 'Choose the next useful problem.', text: 'A focused library for the patterns that show up in the interviews you want.' },
    Progress: { eyebrow: 'Progress lab', title: 'See your momentum clearly.', text: 'A practical read on what is sticking, what needs another pass, and where your next hour matters.' },
    Companies: { eyebrow: 'Company preparation', title: 'Prepare for the rooms you want.', text: 'Targeted tracks for campus hiring, product engineering, and high-signal interview loops.' },
    Mentor: { eyebrow: 'AI Coding Mentor', title: 'A second pair of eyes for your approach.', text: 'Structured coaching prompts that help you reason, not outsource the problem.' },
  };
  return <div className="codelab-heading"><div><p className="eyebrow-label">{copy[view].eyebrow}</p><h1>{copy[view].title}</h1><p>{copy[view].text}</p></div><div className="codelab-actions"><span className="streak-pill"><span />18 day streak</span>{view !== 'Explore' && <button data-testid="button-heading-explore" className="primary-button" onClick={onExplore}>Explore problems <ArrowUpRight size={14} /></button>}{view === 'Explore' && <button data-testid="button-heading-dashboard" className="ghost-button" onClick={() => setView('Dashboard')}><ArrowLeft size={13} /> Dashboard</button>}</div></div>;
}

function StatStrip() {
  const stats = [
    { label: 'Coding score', value: '782', note: '+46 this month', icon: Target },
    { label: 'Problems solved', value: '247', note: 'of 420 curated', icon: CheckCircle2 },
    { label: 'Accuracy', value: '73.8%', note: '+4.2% this month', icon: BarChart3 },
    { label: 'Current streak', value: '18 days', note: 'Personal best 24', icon: Flame },
    { label: 'Total XP', value: '12,480', note: 'Top 8% this term', icon: Zap },
  ];
  return <div className="codelab-stat-grid">{stats.map(({ label, value, note, icon: StatIcon }) => <div className="codelab-stat" key={label} data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}><div className="codelab-stat-top"><span>{label}</span><StatIcon size={16} /></div><strong>{value}</strong><small>{note}</small></div>)}</div>;
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <span className={`difficulty difficulty-${difficulty.toLowerCase()}`}>{difficulty}</span>;
}

function Dashboard({ openProblem, setView }: { openProblem: (problem: CodeProblem) => void; setView: (view: CodelabView) => void }) {
  const weekly = [1, 3, 2, 5, 4, 6, 2];
  return (
    <div className="codelab-view">
      <StatStrip />
      <div className="dashboard-grid">
        <section className="signal-card"><p className="eyebrow-label">Daily challenge · 12 min · Medium</p><h2>Longest Substring Without Repeating Characters</h2><p>Sharpen the sliding-window pattern with a problem that rewards a clean invariant over clever syntax.</p><div className="signal-meta"><span><Clock3 size={13} />Due today</span><span><Users size={13} />Asked at Google</span></div><div className="signal-actions"><button data-testid="button-start-daily-challenge" className="primary-button" onClick={() => openProblem(codeProblems[1])}><Play size={13} fill="currentColor" />Start challenge</button><button data-testid="button-skip-daily-challenge" className="challenge-link" onClick={() => setView('Explore')}>Save for later</button></div></section>
        <section className="dashboard-panel"><div className="panel-title"><div><p className="eyebrow-label">Weekly activity</p><h2>Keep the signal warm.</h2></div><BarChart3 size={18} /></div><div className="activity-bars">{weekly.map((height, index) => <div className="activity-bar" key={index}><span style={{ height: `${height * 13}px` }} /><strong>{height}</strong><label>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</label></div>)}</div></section>
      </div>
      <div className="split-grid">
        <section className="dashboard-panel"><div className="panel-title"><div><p className="eyebrow-label">Skill pulse</p><h2>Topic confidence</h2></div><button data-testid="button-view-progress-from-dashboard" className="text-button" onClick={() => setView('Progress')}>View progress <ChevronRight size={13} /></button></div><div className="topic-list">{topicProgress.slice(0, 4).map((topic) => <div className="topic-row" key={topic.name}><div><span>{topic.name}</span><b>{topic.confidence}%</b></div><div className="progress-track"><span style={{ width: `${topic.confidence}%` }} /></div></div>)}</div></section>
        <section className="dashboard-panel"><div className="panel-title"><div><p className="eyebrow-label">Recently solved</p><h2>Good work, Harsh.</h2></div><CheckCircle2 size={18} /></div><div className="recent-list">{codeProblems.filter((problem) => problem.solved).map((problem) => <button data-testid={`recent-problem-${problem.id}`} className="recent-item" key={problem.id} onClick={() => openProblem(problem)}><div className="problem-dot"><Code2 size={14} /></div><div><strong>{problem.title}</strong><span>{problem.difficulty} · {problem.topics[0]}</span></div><Check size={15} className="solved-mark" /></button>)}</div></section>
      </div>
      <div className="split-grid">
        <section className="dashboard-panel"><div className="panel-title"><div><p className="eyebrow-label">Recent achievements</p><h2>Small wins, logged.</h2></div><Trophy size={18} /></div><div className="achievement-list"><div className="achievement"><div className="achievement-icon"><Flame size={14} /></div><div><strong>Streak architect</strong><span>Practiced 14 days in a row</span></div></div><div className="achievement"><div className="achievement-icon"><Target size={14} /></div><div><strong>Pattern spotter</strong><span>Solved 25 array problems</span></div></div></div></section>
        <section className="dashboard-panel"><div className="panel-title"><div><p className="eyebrow-label">Next best action</p><h2>Give Trees another pass.</h2></div><ArrowUpRight size={18} /></div><p className="panel-copy">Your arrays are dependable. Two BFS problems this week would close the largest readiness gap.</p><button data-testid="button-next-action" className="text-button" onClick={() => setView('Explore')}>Find tree problems <ArrowUpRight size={13} /></button></section>
      </div>
    </div>
  );
}

function Explorer({ globalQuery, openProblem }: { globalQuery: string; openProblem: (problem: CodeProblem) => void }) {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All difficulties');
  const [topic, setTopic] = useState('All topics');
  const [company, setCompany] = useState('All companies');
  const [solvedOnly, setSolvedOnly] = useState(false);
  const [companyOnly, setCompanyOnly] = useState(false);
  const topics = Array.from(new Set(codeProblems.flatMap((problem) => problem.topics)));
  const filtered = useMemo(() => codeProblems.filter((problem) => {
    const search = (globalQuery || query).toLowerCase();
    return (!search || `${problem.title} ${problem.topics.join(' ')} ${problem.companies.join(' ')}`.toLowerCase().includes(search))
      && (difficulty === 'All difficulties' || problem.difficulty === difficulty)
      && (topic === 'All topics' || problem.topics.includes(topic))
      && (company === 'All companies' || problem.companies.includes(company))
      && (!solvedOnly || problem.solved)
      && (!companyOnly || problem.companies.some((name) => ['TechNova', 'CloudStack', 'InnovateLabs'].includes(name)));
  }), [company, companyOnly, difficulty, globalQuery, query, solvedOnly, topic]);
  return <div className="codelab-view">
    <div className="explorer-toolbar"><div className="explorer-search"><Search size={14} /><input data-testid="input-explorer-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by problem, topic, or company" aria-label="Search problem library" /></div><label className="explorer-filter"><SlidersIcon /><select data-testid="select-difficulty-filter" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} aria-label="Filter by difficulty"><option>All difficulties</option><option>Easy</option><option>Medium</option><option>Hard</option></select></label><label className="explorer-filter"><Code2 size={13} /><select data-testid="select-topic-filter-codelab" value={topic} onChange={(event) => setTopic(event.target.value)} aria-label="Filter by topic"><option>All topics</option>{topics.map((item) => <option key={item}>{item}</option>)}</select></label><label className="toggle-filter"><input data-testid="checkbox-solved-filter" type="checkbox" checked={solvedOnly} onChange={(event) => setSolvedOnly(event.target.checked)} />Solved only</label></div>
    <div className="company-filter"><label className="explorer-filter"><BriefcaseBusiness size={13} /><select data-testid="select-company-filter" value={company} onChange={(event) => setCompany(event.target.value)} aria-label="Filter by company"><option>All companies</option>{companyTracks.map((track) => <option key={track.name}>{track.name}</option>)}</select></label><label className="toggle-filter"><input data-testid="checkbox-company-filter" type="checkbox" checked={companyOnly} onChange={(event) => setCompanyOnly(event.target.checked)} />Company preparation</label></div>
    <div className="result-bar"><span><strong>{filtered.length}</strong> problems in your signal library</span><span>Curated for Harsh V. M</span></div>
    {filtered.length ? <div className="problem-grid">{filtered.map((problem) => <button data-testid={`card-problem-${problem.id}`} key={problem.id} className="problem-card" onClick={() => openProblem(problem)}><div className="problem-card-top"><DifficultyBadge difficulty={problem.difficulty} />{problem.solved && <span className="solved-pill"><CheckCircle2 size={12} />Solved</span>}</div><h3>{problem.title}</h3><p>{problem.topics.join(' · ')}</p><div className="problem-card-foot"><span><Users size={11} />{problem.companies.slice(0, 2).join(' · ')}</span><span>{problem.acceptance} accepted <ChevronRight size={12} /></span></div></button>)}</div> : <div className="empty-state"><Search size={22} /><p>No problems match those filters.</p><button data-testid="button-clear-explorer-filters" className="primary-button" onClick={() => { setQuery(''); setDifficulty('All difficulties'); setTopic('All topics'); setCompany('All companies'); setSolvedOnly(false); setCompanyOnly(false); }}>Clear filters</button></div>}
  </div>;
}

function SlidersIcon() {
  return <span style={{ display: 'inline-flex' }}><ListChecks size={13} /></span>;
}

function ProblemDetail({ problem, onBack, onWorkspace, onRelated }: { problem: CodeProblem; onBack: () => void; onWorkspace: () => void; onRelated: (problem: CodeProblem) => void }) {
  return <div className="codelab-view detail-shell"><button data-testid="button-back-to-explorer" className="back-link" onClick={onBack}><ArrowLeft size={14} />Back to problem explorer</button><div className="detail-grid"><article className="detail-main"><div><DifficultyBadge difficulty={problem.difficulty} /> <span className="problem-copy em">{problem.topics.join(' · ')}</span></div><h1>{problem.title}</h1><p className="detail-lead">{problem.description}</p><div className="detail-section"><h2>Examples</h2><div className="example-box">{problem.examples}</div></div><div className="detail-section"><h2>Constraints</h2><ul>{problem.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul></div><div className="detail-section"><h2>Related concepts</h2><div className="concepts">{problem.topics.map((item) => <span key={item}>{item}</span>)}{problem.related.slice(0, 2).map((item) => <span key={item}>{item}</span>)}</div></div></article><aside className="detail-aside"><div className="detail-side-card"><h3>Ready to work?</h3><p className="panel-copy">Open the professional workspace with starter code, tests, and an honest mock console.</p><button data-testid="button-open-workspace" className="primary-button" onClick={onWorkspace}>Open workspace <ArrowUpRight size={13} /></button></div><div className="detail-side-card"><h3>Hints</h3><div className="hint-box"><CircleHelp size={13} /> {problem.hints[0]}</div><div className="hint-box">{problem.hints[1]}</div></div><div className="detail-side-card"><h3>Related problems</h3><div className="related-list">{problem.related.map((related) => <button data-testid={`button-related-${related.replaceAll(' ', '-').toLowerCase()}`} className="text-button" key={related} onClick={() => { const match = codeProblems.find((candidate) => candidate.title === related); if (match) onRelated(match); else onBack(); }}>{related} <ChevronRight size={12} /></button>)}</div></div></aside></div></div>;
}

function Workspace({ problem, onBack }: { problem: CodeProblem; onBack: () => void }) {
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState(problem.starterCode.JavaScript);
  const [output, setOutput] = useState('Select Run to preview the local mock status.');
  const [status, setStatus] = useState('Ready for your approach');
  const [activeTest, setActiveTest] = useState(0);
  const runMock = () => { setStatus('Mock run complete'); setOutput(`Local mock runner\n\nTest cases inspected: ${problem.tests.length}\nSelected case: ${activeTest + 1}\n\nExecution service: not connected\nNo code was executed. Your editor is ready for a secure backend when one is available.`); };
  const submitMock = () => { setStatus('Submission recorded as a mock'); setOutput('Submission status\n\nThis is a local preview only.\nNo code was sent or executed.\nA secure execution backend can replace this client-side handler later.'); };
  const changeLanguage = (value: string) => { setLanguage(value); setCode(problem.starterCode[value]); setStatus('Ready for your approach'); };
  return <div className="codelab-view detail-shell"><button data-testid="button-back-from-workspace" className="back-link" onClick={onBack}><ArrowLeft size={14} />Back to {problem.title}</button><div className="workspace-shell"><div className="workspace-toolbar"><div><p className="eyebrow-label">Coding workspace</p><h2>{problem.title}</h2></div><div className="workspace-tools"><select data-testid="select-language" className="language-select" value={language} onChange={(event) => changeLanguage(event.target.value)} aria-label="Select programming language"><option>JavaScript</option><option>Python</option><option>Java</option></select><button data-testid="button-run-code" className="run-button" onClick={runMock}><Play size={12} />Run</button><button data-testid="button-submit-code" className="submit-button" onClick={submitMock}><CheckCircle2 size={12} />Submit</button></div></div><div className="workspace-grid"><section className="editor-pane"><div className="editor-label"><span>{language} · starter file</span><span>Mock workspace</span></div><textarea data-testid="textarea-code-editor" className="code-editor" value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} aria-label="Code editor" /></section><aside className="console-pane"><div className="test-panel"><div className="workspace-subtitle"><strong>Test cases</strong><span>{problem.tests.length} examples</span></div><div className="test-case-list">{problem.tests.map((test, index) => <button data-testid={`button-test-case-${index + 1}`} className={`test-case ${activeTest === index ? 'test-case-active' : ''}`} key={test.input} onClick={() => setActiveTest(index)}><span>Case {index + 1} · {test.input}</span><span>{test.expected}</span></button>)}</div></div><div className="output-panel"><div className="workspace-subtitle"><strong>Console / output</strong><span>{status}</span></div><div data-testid="status-submission" className="status-banner"><Sparkles size={13} />Honest preview: Run and Submit use local mock handlers until secure execution is connected.</div><div data-testid="text-console-output" className="console-output">{output}</div></div></aside></div></div></div>;
}

function Progress() {
  const difficulties = [{ name: 'Easy', solved: 108, total: 140, color: '#5cae89' }, { name: 'Medium', solved: 103, total: 190, color: '#bd8c3d' }, { name: 'Hard', solved: 36, total: 90, color: '#b96774' }];
  return <div className="codelab-view"><div className="progress-layout"><section className="dashboard-panel"><div className="panel-title"><div><p className="eyebrow-label">Difficulty spread</p><h2>Depth over volume.</h2></div><BarChart3 size={18} /></div><div className="difficulty-stats">{difficulties.map((item) => <div className="difficulty-stat" key={item.name}><strong>{item.solved}</strong><span>{item.name} of {item.total}</span><div className="progress-track"><span style={{ width: `${Math.round((item.solved / item.total) * 100)}%`, background: item.color }} /></div></div>)}</div><div className="panel-title" style={{ marginTop: 27 }}><div><p className="eyebrow-label">Last 7 days</p><h2>Weekly activity</h2></div><span className="eyebrow-label">23 problems</span></div><div className="weekly-grid">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => <div className="week-day" key={day}><span style={{ opacity: [.35, .65, .85, .55, 1, .78, .42][index] }} />{day}</div>)}</div></section><section className="dashboard-panel"><div className="panel-title"><div><p className="eyebrow-label">Streak health</p><h2>18 days active.</h2></div><Flame size={18} /></div><div className="signal-meta"><span><Zap size={13} />12,480 XP</span><span><Trophy size={13} />8 achievements</span></div><div className="achievement-list"><div className="achievement"><div className="achievement-icon"><Flame size={14} /></div><div><strong>Current streak</strong><span>6 days until your next milestone</span></div></div><div className="achievement"><div className="achievement-icon"><Trophy size={14} /></div><div><strong>Pattern spotter</strong><span>Arrays confidence at 90%</span></div></div></div></section></div><section className="dashboard-panel" style={{ marginTop: 16 }}><div className="panel-title"><div><p className="eyebrow-label">Topic progress</p><h2>Where your next repetition pays off.</h2></div><Target size={18} /></div><div className="topic-list">{topicProgress.map((topic) => <div className="topic-row" key={topic.name}><div><span>{topic.name}</span><b>{topic.solved} / {topic.total} solved</b></div><div className="progress-track"><span style={{ width: `${Math.round((topic.solved / topic.total) * 100)}%` }} /></div></div>)}</div></section></div>;
}

function Companies({ openProblem }: { openProblem: (problem: CodeProblem) => void }) {
  return <div className="codelab-view"><div className="company-grid">{companyTracks.map((company) => { const percent = Math.round((company.solved / company.total) * 100); const recommended = codeProblems.find((problem) => problem.companies.includes(company.name) && !problem.solved); return <article className="company-track" key={company.name}><div className="company-track-top"><div className={`company-logo ${company.color}`}>{company.initials}</div><div><h3>{company.name}</h3><p>{company.focus}</p></div></div><div className="company-track-foot"><span>{company.solved} of {company.total} solved</span><b>{percent}%</b></div><div className="progress-track"><span style={{ width: `${percent}%` }} /></div><div className="concepts">{company.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>{recommended && <button data-testid={`button-company-recommendation-${company.name}`} className="text-button" style={{ marginTop: 16 }} onClick={() => openProblem(recommended)}>Continue with {recommended.title} <ArrowUpRight size={12} /></button>}</article>; })}</div><section className="dashboard-panel" style={{ marginTop: 16 }}><div className="panel-title"><div><p className="eyebrow-label">Recommended topics</p><h2>Build a portable interview base.</h2></div><BriefcaseBusiness size={18} /></div><div className="topic-list">{['Graphs', 'Heap', 'System design', 'Dynamic Programming'].map((topic, index) => <div className="topic-row" key={topic}><div><span>{topic}</span><b>{['High signal', 'Practice next', 'Foundation', 'Stretch'][index]}</b></div><div className="progress-track"><span style={{ width: `${[43, 38, 26, 31][index]}%` }} /></div></div>)}</div></section></div>;
}

function Mentor() {
  const [response, setResponse] = useState('');
  const actions = [{ key: 'hint', title: 'Give me a hint', description: 'Nudge the next idea without giving away the solution.', icon: CircleHelp }, { key: 'concept', title: 'Explain the concept', description: 'Connect the pattern to the bigger interview toolkit.', icon: BookOpen }, { key: 'approach', title: 'Analyze my approach', description: 'Pressure-test complexity, edge cases, and clarity.', icon: Target }, { key: 'related', title: 'Related problems', description: 'Choose a nearby problem to reinforce the pattern.', icon: Code2 }];
  return <div className="codelab-view mentor-layout"><section className="mentor-intro"><div className="mentor-icon"><BrainCircuit size={18} /></div><h2>Reason clearly. Code confidently.</h2><p>Use the mentor as a reflection surface while you practice. These coaching states are locally seeded previews, not a live AI response.</p><span className="mentor-disclaimer"><Sparkles size={11} />Mock coaching mode · no code is uploaded</span></section><section className="mentor-actions">{actions.map(({ key, title, description, icon: ActionIcon }) => <button data-testid={`button-mentor-${key}`} className="mentor-action" key={key} onClick={() => setResponse(mentorResponses[key])}><ActionIcon size={16} /><strong>{title}</strong><span>{description}</span></button>)}{response && <div data-testid="mentor-response" className="mentor-response"><div className="mentor-response-head"><BrainCircuit size={14} />Local mentor preview</div><p>{response}</p></div>}</section></div>;
}

function CodeLab({ globalQuery }: { globalQuery: string }) {
  const [view, setView] = useState<CodelabView>('Dashboard');
  const [selectedProblem, setSelectedProblem] = useState<CodeProblem | null>(null);
  const [workspace, setWorkspace] = useState(false);
  const openProblem = (problem: CodeProblem) => { setSelectedProblem(problem); setWorkspace(false); };
  if (selectedProblem && workspace) return <><PageHeading view="Explore" setView={setView} onExplore={() => { setSelectedProblem(null); setWorkspace(false); }} /><ProblemWorkspaceContent problem={selectedProblem} onBack={() => setWorkspace(false)} /></>;
  if (selectedProblem) return <><PageHeading view="Explore" setView={setView} onExplore={() => { setSelectedProblem(null); setWorkspace(false); }} /><ProblemDetail problem={selectedProblem} onBack={() => setSelectedProblem(null)} onWorkspace={() => setWorkspace(true)} onRelated={openProblem} /></>;
  return <div className="codelab-app"><PageHeading view={view} setView={setView} onExplore={() => setView('Explore')} /><CodelabTabs view={view} setView={setView} />{view === 'Dashboard' && <Dashboard openProblem={openProblem} setView={setView} />}{view === 'Explore' && <Explorer globalQuery={globalQuery} openProblem={openProblem} />}{view === 'Progress' && <Progress />}{view === 'Companies' && <Companies openProblem={openProblem} />}{view === 'Mentor' && <Mentor />}<footer className="page-footer"><span>CampusOS · CodeLab</span><span>Practice with purpose. Ship your career.</span></footer></div>;
}

function ProblemWorkspaceContent({ problem, onBack }: { problem: CodeProblem; onBack: () => void }) {
  return <Workspace problem={problem} onBack={onBack} />;
}

function Overview({ active }: { active: string }) {
  return <div className="overview-empty"><div className="empty-orbit"><LayoutDashboard size={23} /></div><p className="section-kicker">{active === 'Overview' ? 'Student command center' : active}</p><h1>{active === 'Overview' ? 'Your Overview is ready' : `${active} is ready for you`}</h1><p>Choose CodeLab from the sidebar to enter your coding practice workspace.</p><button data-testid="button-empty-codelab" className="primary-button" onClick={() => window.dispatchEvent(new CustomEvent('campusos-select-codelab'))}>Open CodeLab <ArrowUpRight size={14} /></button></div>;
}

function App() {
  const [active, setActive] = useState('CodeLab');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [globalQuery, setGlobalQuery] = useState('');
  useEffect(() => { const selectCodeLab = () => setActive('CodeLab'); window.addEventListener('campusos-select-codelab', selectCodeLab); return () => window.removeEventListener('campusos-select-codelab', selectCodeLab); }, []);
  return <div className="campus-app">{heroVisible && <HeroExperience onEnter={() => setHeroVisible(false)} />}<Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} /><main className="app-main"><Header setOpen={setSidebarOpen} query={globalQuery} setQuery={setGlobalQuery} /><div className="main-content">{active === 'CodeLab' ? <CodeLab globalQuery={globalQuery} /> : <Overview active={active} />}</div></main>{sidebarOpen && <button data-testid="button-close-navigation-overlay" className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close navigation overlay" />}</div>;
}

export default App;