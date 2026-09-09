import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
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
  SlidersHorizontal,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { campusModules, type CampusModule } from '@/lib/campusos';

type Icon = typeof LayoutDashboard;
type NavItem = Omit<CampusModule, 'icon'> & { icon: Icon };
type Problem = {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  solved: number;
  total: number;
  company: string;
  tag: string;
};

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
const navItems: NavItem[] = campusModules.map((module) => ({
  ...module,
  icon: moduleIcons[module.icon],
}));
const problems: Problem[] = [
  { title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', solved: 238, total: 250, company: 'Amazon', tag: 'Most asked' },
  { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Sliding Window', solved: 174, total: 220, company: 'Google', tag: 'Interview pick' },
  { title: 'Merge K Sorted Lists', difficulty: 'Hard', topic: 'Heap', solved: 92, total: 140, company: 'Microsoft', tag: 'Stretch goal' },
];
const companies = [
  { name: 'TechNova', logo: 'TN', roles: '12 roles', color: 'company-indigo', topics: 'Arrays · SQL · OOP' },
  { name: 'CloudStack', logo: 'CS', roles: '8 roles', color: 'company-sky', topics: 'Backend · DBMS · APIs' },
  { name: 'InnovateLabs', logo: 'IL', roles: '6 roles', color: 'company-violet', topics: 'DSA · React · System design' },
];

function Logo() {
  return (
    <div className="brand-lockup">
      <div className="brand-mark">
        <GraduationCap size={19} />
        <span />
      </div>
      <div>
        <p className="brand-name">Campus<span>OS</span></p>
        <p className="brand-caption">Career operating system</p>
      </div>
    </div>
  );
}

function HeroExperience({ onEnter }: { onEnter: () => void }) {
  const [ready, setReady] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 450);
    const onMove = (event: MouseEvent) =>
      setParallax({
        x: (event.clientX / window.innerWidth - 0.5) * 8,
        y: (event.clientY / window.innerHeight - 0.5) * 5,
      });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section className="hero-shell" aria-label="CampusOS introduction">
      <div className="hero-atmosphere" style={{ transform: `translate3d(${parallax.x * 0.45}px,${parallax.y * 0.45}px,0)` }} />
      <div className="hero-grid" />
      <div className="hero-architecture hero-architecture-left" />
      <div className="hero-architecture hero-architecture-right" />
      <div className="hero-particle hero-particle-one" />
      <div className="hero-particle hero-particle-two" />
      <div className="hero-particle hero-particle-three" />
      <div className="hero-kicker">CAMPUSOS <span /> CAREER OPERATING SYSTEM</div>
      <div className="hero-wordmark">
        <span className="hero-wordmark-shadow">Campus<span>OS</span></span>
        <span className="hero-wordmark-face">Campus<span>OS</span></span>
        <p>The operating system for student careers.</p>
      </div>
      <div className={`hero-student ${ready ? 'hero-student-active' : ''}`} style={{ transform: `translate3d(${parallax.x}px,${parallax.y}px,0)` }}>
        <img src="/campusos-student.png" alt="Student building momentum with CampusOS" />
      </div>
      <div className="hero-copy"><span className="hero-status-dot" />Initializing your career workspace...</div>
      <div className="hero-cta-row">
        <button data-testid="button-enter-campusos" onClick={onEnter} className="hero-enter-button">Explore CampusOS <ArrowUpRight size={15} /></button>
        <span>Placements · CodeLab · Career Analytics</span>
      </div>
    </section>
  );
}

function Sidebar({ active, setActive, open, setOpen }: { active: string; setActive: (value: string) => void; open: boolean; setOpen: (value: boolean) => void }) {
  return (
    <aside className={`app-sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top">
        <Logo />
        <button data-testid="button-close-navigation" className="icon-button sidebar-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={16} /></button>
      </div>
      <div className="sidebar-label">Workspace</div>
      <nav className="sidebar-nav" aria-label="Student workspace">
        {navItems.map(({ id, label, description, icon: IconComp }) => (
          <button
            data-testid={`nav-${id}`}
            key={id}
            title={description}
            onClick={() => { setActive(label); setOpen(false); }}
            className={`nav-item ${active === label ? 'nav-item-active' : ''}`}
          >
            <IconComp size={17} />
            <span>{label}</span>
            {label === 'CodeLab' && <span className={`new-badge ${active === label ? 'new-badge-active' : ''}`}>New</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-rule" />
      <button data-testid="button-settings" className="nav-item nav-settings" onClick={() => setActive('Settings')}><Settings size={17} /><span>Settings</span></button>
      <div className="profile-card">
        <div className="profile-row">
          <div className="avatar">HM</div>
          <div className="profile-copy"><p>Hareesh V M</p><span>Computer Science Student</span></div>
          <ChevronDown size={14} className="profile-chevron" />
        </div>
        <div className="readiness"><span />Placement Ready</div>
      </div>
    </aside>
  );
}

function Header({ setOpen, query, setQuery }: { setOpen: (value: boolean) => void; query: string; setQuery: (value: string) => void }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button data-testid="button-open-navigation" className="icon-button mobile-menu" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={17} /></button>
        <div className="global-search">
          <Search size={15} />
          <input data-testid="input-global-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search problems, topics, companies..." aria-label="Search problems, topics, companies" />
          <span className="search-key">⌘ K</span>
        </div>
      </div>
      <div className="header-actions">
        <button data-testid="button-notifications" className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><span /></button>
        <button data-testid="button-messages" className="icon-button" aria-label="Messages"><MessageSquare size={18} /></button>
        <div className="header-profile"><div className="avatar avatar-small">HM</div><ChevronDown size={13} /></div>
      </div>
    </header>
  );
}

function Stat({ icon: IconComp, label, value, note, tone }: { icon: Icon; label: string; value: string; note: string; tone: string }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}><IconComp size={17} /></div>
      <p className="eyebrow-label">{label}</p>
      <div className="stat-bottom"><p className="stat-value">{value}</p><p className="stat-note">{note}</p></div>
    </div>
  );
}

function CodeLab({ globalQuery }: { globalQuery: string }) {
  const [filter, setFilter] = useState('All topics');
  const [query, setQuery] = useState('');
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [libraryExpanded, setLibraryExpanded] = useState(false);
  const combinedQuery = globalQuery || query;
  const filtered = useMemo(
    () => problems.filter((problem) => (filter === 'All topics' || problem.topic === filter) && `${problem.title} ${problem.company}`.toLowerCase().includes(combinedQuery.toLowerCase())),
    [filter, combinedQuery],
  );

  return (
    <>
      <div className="page-intro">
        <div>
          <div className="section-kicker"><Code2 size={14} /> CodeLab workspace</div>
          <h1>Build your interview edge.</h1>
          <p>Practice with intention, spot your gaps, and turn every solved problem into placement momentum.</p>
        </div>
        <div className="intro-actions">
          <span className="streak-pill"><span />18 day streak</span>
          <button data-testid="button-view-roadmap" className="primary-button">View roadmap <ArrowUpRight size={14} /></button>
        </div>
      </div>

      <div className="stats-grid">
        <Stat icon={CheckCircle2} label="Problems solved" value="247" note="+18 this month" tone="tone-indigo" />
        <Stat icon={Flame} label="Current streak" value="18 days" note="Personal best 24" tone="tone-orange" />
        <Stat icon={Target} label="Interview readiness" value="82%" note="+6 this month" tone="tone-violet" />
        <Stat icon={Trophy} label="Campus rank" value="#24" note="Top 8%" tone="tone-amber" />
      </div>

      <div className="feature-grid">
        <section className="practice-card">
          <div className="practice-glow" />
          <div className="practice-content">
            <span className="soft-pill"><Sparkles size={13} /> Daily practice</span>
            <h2>Keep the streak alive.</h2>
            <p>One focused problem today keeps your interview instincts sharp.</p>
            <div className="practice-actions">
              <button data-testid="button-start-challenge" onClick={() => setPracticeOpen((value) => !value)} className="dark-button"><Play size={13} fill="currentColor" />{practiceOpen ? 'Hide challenge' : 'Start challenge'}</button>
              <span><Clock3 size={13} />12 min · Medium</span>
            </div>
            {practiceOpen && <div className="challenge-reveal"><Zap size={14} /> Today&apos;s challenge: <strong>Longest Substring Without Repeating Characters</strong></div>}
          </div>
          <div className="goal-ring" aria-label="72 percent weekly goal"><div><strong>72</strong><span>weekly goal</span></div></div>
        </section>
        <section className="panel skill-panel">
          <div className="panel-heading"><div><p className="eyebrow-label">Skill pulse</p><h2>Topic confidence</h2></div><BarChart3 size={20} className="heading-icon" /></div>
          <div className="skill-list">
            {[['Arrays', 90], ['Strings', 82], ['Trees', 55], ['Graphs', 42]].map(([label, value]) => (
              <div key={label as string} className="skill-row"><div><span>{label}</span><b>{value}%</b></div><div className="progress-track"><span style={{ width: `${value}%` }} /></div></div>
            ))}
          </div>
          <button data-testid="button-view-skills" className="text-button">View all skills <ChevronRight size={14} /></button>
        </section>
      </div>

      <div className="content-grid">
        <section className="panel library-panel">
          <div className="panel-heading library-heading">
            <div><p className="eyebrow-label">Problem library</p><h2>Practice by signal, not noise.</h2></div>
            <div className="library-controls">
              <div className="small-search"><Search size={13} /><input data-testid="input-problem-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a problem" aria-label="Find a problem" /></div>
              <div className="select-wrap"><SlidersHorizontal size={12} /><select data-testid="select-topic-filter" value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter by topic"><option>All topics</option><option>Arrays</option><option>Sliding Window</option><option>Heap</option></select></div>
            </div>
          </div>
          <div className="problem-list">
            {filtered.length > 0 ? filtered.map((problem) => {
              const progress = Math.round((problem.solved / problem.total) * 100);
              return (
                <button data-testid={`row-problem-${problem.title.replaceAll(' ', '-').toLowerCase()}`} key={problem.title} className="problem-row" onClick={() => setPracticeOpen(true)}>
                  <div className="problem-symbol"><Code2 size={15} /></div>
                  <div className="problem-copy"><div><strong>{problem.title}</strong><span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span><em>{problem.tag}</em></div><p>{problem.topic} · {problem.company}</p></div>
                  <div className="row-progress"><div><span>Progress</span><b>{progress}%</b></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div></div>
                  <ChevronRight size={16} className="row-chevron" />
                </button>
              );
            }) : <div className="empty-search"><Search size={20} /><p>No problems match that search.</p><button onClick={() => { setQuery(''); setFilter('All topics'); }}>Clear filters</button></div>}
          </div>
          <button data-testid="button-expand-library" className={`library-button ${libraryExpanded ? 'library-expanded' : ''}`} onClick={() => setLibraryExpanded((value) => !value)}>{libraryExpanded ? 'Library is fully expanded' : 'Explore full problem library'} <ArrowUpRight size={14} /></button>
        </section>
        <div className="side-stack">
          <section className="panel company-panel">
            <div className="panel-heading"><div><p className="eyebrow-label">Company prep</p><h2>What recruiters ask.</h2></div><BriefcaseBusiness size={20} className="heading-icon" /></div>
            <div className="company-list">{companies.map((company) => <button data-testid={`button-company-${company.name}`} key={company.name} className="company-row" onClick={() => setPracticeOpen(true)}><div className={`company-logo ${company.color}`}>{company.logo}</div><div><strong>{company.name}</strong><span>{company.topics}</span></div><b>{company.roles}</b></button>)}</div>
            <button data-testid="button-company-tracks" className="text-button">View company tracks <ArrowUpRight size={13} /></button>
          </section>
          <section className="mentor-card">
            <div className="mentor-icon"><BrainCircuit size={18} /></div>
            <h2>Your AI practice cue</h2>
            <p>You&apos;re strong in arrays. A focused Trees session could unlock your next readiness jump.</p>
            <button data-testid="button-ask-mentor" className="mentor-button" onClick={() => setPracticeOpen(true)}>Ask AI Mentor <ArrowUpRight size={14} /></button>
          </section>
        </div>
      </div>
      <footer className="page-footer"><span>CampusOS · CodeLab</span><span>Practice with purpose. Ship your career.</span></footer>
    </>
  );
}

function Overview({ active }: { active: string }) {
  return (
    <div className="overview-empty">
      <div className="empty-orbit"><LayoutDashboard size={23} /></div>
      <p className="section-kicker">{active === 'Overview' ? 'Student command center' : active}</p>
      <h1>{active === 'Overview' ? 'Your Overview is ready' : `${active} is ready for you`}</h1>
      <p>Choose CodeLab from the sidebar to enter your coding practice workspace.</p>
      <button data-testid="button-empty-codelab" className="primary-button" onClick={() => window.dispatchEvent(new CustomEvent('campusos-select-codelab'))}>Open CodeLab <ArrowUpRight size={14} /></button>
    </div>
  );
}

function App() {
  const [active, setActive] = useState('CodeLab');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [globalQuery, setGlobalQuery] = useState('');

  useEffect(() => {
    const selectCodeLab = () => setActive('CodeLab');
    window.addEventListener('campusos-select-codelab', selectCodeLab);
    return () => window.removeEventListener('campusos-select-codelab', selectCodeLab);
  }, []);

  return (
    <div className="campus-app">
      {heroVisible && <HeroExperience onEnter={() => setHeroVisible(false)} />}
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="app-main">
        <Header setOpen={setSidebarOpen} query={globalQuery} setQuery={setGlobalQuery} />
        <div className="main-content">
          {active === 'CodeLab' ? <CodeLab globalQuery={globalQuery} /> : <Overview active={active} />}
        </div>
      </main>
      {sidebarOpen && <button data-testid="button-close-navigation-overlay" className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close navigation overlay" />}
    </div>
  );
}

export default App;
