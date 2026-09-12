import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Gauge,
  Layers,
  ListChecks,
  Mic,
  Radar,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import './career-twin.css';
import {
  careerDna,
  careerReadinessScore,
  careerTimeline,
  codingReadiness,
  communicationScore,
  companyFitTargets,
  gapLevel,
  interviewModes,
  interviewReadiness,
  missions as missionSeed,
  placementProbability,
  placementSimulatorStages,
  sampleInterviewReport,
  targetRoles,
  type Mission,
} from '@/lib/career-twin-data';

type TwinTab = 'Dashboard' | 'Skill Gap' | 'Missions' | 'Interview Arena' | 'Company Fit';

function TwinTabs({ tab, setTab }: { tab: TwinTab; setTab: (tab: TwinTab) => void }) {
  const tabs: { label: TwinTab; icon: typeof Gauge }[] = [
    { label: 'Dashboard', icon: Gauge },
    { label: 'Skill Gap', icon: Radar },
    { label: 'Missions', icon: ListChecks },
    { label: 'Interview Arena', icon: Mic },
    { label: 'Company Fit', icon: Building2 },
  ];
  return (
    <nav className="twin-tabs" aria-label="Career Twin sections">
      {tabs.map(({ label, icon: TabIcon }) => (
        <button
          key={label}
          data-testid={`tab-twin-${label.toLowerCase().replaceAll(' ', '-')}`}
          className={`twin-tab ${tab === label ? 'twin-tab-active' : ''}`}
          onClick={() => setTab(label)}
        >
          <TabIcon size={14} />
          {label}
        </button>
      ))}
    </nav>
  );
}

function ReadinessRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="twin-ring">
      <svg width={128} height={128}>
        <circle cx={64} cy={64} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={10} />
        <circle
          cx={64}
          cy={64}
          r={radius}
          fill="none"
          stroke="url(#twinRingGradient)"
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="twinRingGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b7bff" />
            <stop offset="100%" stopColor="#7fe3d8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="twin-ring-value">
        <strong>{score}</strong>
        <span>Readiness</span>
      </div>
    </div>
  );
}

function DashboardTab() {
  return (
    <div className="twin-grid">
      <section className="twin-panel twin-col-7">
        <div className="twin-panel-glow" />
        <p className="twin-kicker">Career Readiness Score</p>
        <div className="twin-score-row">
          <ReadinessRing score={careerReadinessScore.score} />
          <div className="twin-score-copy">
            <span className="twin-delta"><TrendingUp size={13} />+{careerReadinessScore.delta} pts this month</span>
            <p>{careerReadinessScore.label}</p>
          </div>
        </div>
        <div className="twin-stat-grid" style={{ marginTop: 20 }}>
          <div className="twin-stat"><span>Coding readiness</span><strong>{codingReadiness.score}</strong><small>+{codingReadiness.delta} this month</small></div>
          <div className="twin-stat"><span>Communication</span><strong>{communicationScore.score}</strong><small>+{communicationScore.delta} this month</small></div>
          <div className="twin-stat"><span>Placement probability</span><strong>{placementProbability.score}%</strong><small>+{placementProbability.delta} this month</small></div>
        </div>
      </section>

      <section className="twin-panel twin-col-5">
        <div className="twin-panel-title"><div><p className="twin-kicker">Career Twin</p><h2>Your evolving profile</h2></div><Sparkles size={17} /></div>
        <div className="twin-dna-groups" style={{ marginTop: 14 }}>
          {careerDna.slice(0, 6).map((c) => (
            <div className="twin-dna-row" key={c.key}>
              <span>{c.label}</span>
              <div className="twin-dna-track"><span className="twin-dna-fill" style={{ width: `${c.score}%` }} /></div>
              <b>{c.score}%</b>
            </div>
          ))}
        </div>
      </section>

      <section className="twin-panel twin-col-8">
        <div className="twin-panel-title"><div><p className="twin-kicker">Career progress timeline</p><h2>How you got here.</h2></div><Layers size={17} /></div>
        <div className="twin-timeline" style={{ marginTop: 16 }}>
          {careerTimeline.map((event) => (
            <div className="twin-timeline-row" key={event.label}>
              <span className="twin-tl-date">{event.date}</span>
              <div className="twin-timeline-line"><span className="twin-timeline-dot" /><span className="twin-timeline-stem" /></div>
              <div className="twin-timeline-body"><strong>{event.label}</strong><p>{event.detail}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="twin-panel twin-col-4">
        <div className="twin-panel-title"><div><p className="twin-kicker">Interview readiness</p><h2>{interviewReadiness.score}/100</h2></div><Mic size={17} /></div>
        <p style={{ color: 'var(--twin-ivory-dim)', fontSize: 12, lineHeight: 1.6, marginTop: 8 }}>
          Up {interviewReadiness.delta} points this month. Run a mock round in the Interview Arena to keep it climbing.
        </p>
        <div className="twin-mission-skills" style={{ marginTop: 12 }}>
          {missionSeed.filter((m) => m.status !== 'completed').slice(0, 2).map((m) => <span key={m.id}>{m.code}</span>)}
        </div>
      </section>
    </div>
  );
}

function SkillGapTab() {
  const [roleId, setRoleId] = useState(targetRoles[0].id);
  const role = targetRoles.find((r) => r.id === roleId)!;
  const criticalGaps = role.requirements.filter((r) => gapLevel(r) === 'critical');
  return (
    <div className="twin-grid">
      <section className="twin-panel twin-col-12">
        <div className="twin-panel-title"><div><p className="twin-kicker">Target role</p><h2>Skill Gap Map</h2></div><Target size={17} /></div>
        <div className="twin-role-select">
          {targetRoles.map((r) => (
            <button key={r.id} className={`twin-role-chip ${roleId === r.id ? 'twin-role-chip-active' : ''}`} onClick={() => setRoleId(r.id)}>{r.role}</button>
          ))}
        </div>
        <div>
          {role.requirements.map((req) => {
            const level = gapLevel(req);
            return (
              <div className="twin-gap-row" key={req.skill}>
                <span>{req.skill}</span>
                <div className="twin-dna-track"><span className="twin-dna-fill" style={{ width: `${req.current}%` }} /></div>
                <b>{req.current}%</b>
                <span className={`twin-gap-badge twin-gap-${level}`}>{level}</span>
              </div>
            );
          })}
        </div>
        {criticalGaps.length > 0 && (
          <div className="twin-critical-callout">
            <div>
              <strong>Critical gap: {criticalGaps.map((g) => g.skill).join(', ')}</strong>
              <p>Recommended mission: "Design a scalable student authentication service."</p>
            </div>
            <button className="twin-button">View mission <ArrowUpRight size={13} /></button>
          </div>
        )}
      </section>
    </div>
  );
}

function MissionCard({ mission }: { mission: Mission }) {
  const [status, setStatus] = useState(mission.status);
  const label = status === 'completed' ? 'Completed' : status === 'in-progress' ? 'Continue' : 'Start mission';
  return (
    <article className="twin-mission-card">
      <div className="twin-mission-top">
        <span className="twin-mission-code">{mission.code}</span>
        <span className="twin-mission-diff">{[1, 2, 3, 4, 5].map((n) => <span key={n} className={n <= mission.difficulty ? 'on' : ''} />)}</span>
      </div>
      <h3>{mission.title}</h3>
      <p>{mission.description}</p>
      <div className="twin-mission-skills">{mission.skills.map((s) => <span key={s}>{s}</span>)}</div>
      <div className="twin-mission-foot">
        <div className="twin-mission-meta">
          <span>{mission.estMinutes} min</span>
          <span className="twin-mission-xp">+{mission.xp} XP</span>
          <span>+{mission.readinessBoost.percent}% {mission.readinessBoost.area}</span>
        </div>
      </div>
      <button
        className={`twin-mission-status ${status}`}
        disabled={status === 'completed'}
        onClick={() => setStatus(status === 'available' ? 'in-progress' : 'completed')}
      >
        {label}
      </button>
    </article>
  );
}

function MissionsTab() {
  return (
    <div className="twin-grid">
      <section className="twin-col-12">
        <div className="twin-mission-grid">
          {missionSeed.map((m) => <MissionCard key={m.id} mission={m} />)}
        </div>
      </section>
    </div>
  );
}

function InterviewArenaTab() {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const report = sampleInterviewReport;
  if (activeMode) {
    const mode = interviewModes.find((m) => m.id === activeMode)!;
    return (
      <div className="twin-grid">
        <section className="twin-panel twin-col-12">
          <div className="twin-panel-title">
            <div><p className="twin-kicker">{mode.label} · session report</p><h2>Here is how that round read.</h2></div>
            <button className="twin-ghost-button" onClick={() => setActiveMode(null)}>Back to modes</button>
          </div>
          <div className="twin-grid" style={{ marginTop: 16 }}>
            <div className="twin-col-6">
              {([
                ['Confidence', report.confidence],
                ['Communication', report.communication],
                ['Technical knowledge', report.technicalKnowledge],
                ['Clarity', report.clarity],
                ['Problem solving', report.problemSolving],
                ['Answer structure', report.answerStructure],
              ] as [string, number][]).map(([label, value]) => (
                <div className="twin-report-metric" key={label}><span>{label}</span><b>{value}/100</b></div>
              ))}
              <div className="twin-report-metric"><span>Filler words</span><b>{report.fillerWords} per 5 min</b></div>
            </div>
            <div className="twin-col-6">
              <p className="twin-kicker">Strengths</p>
              <ul className="twin-report-list good">{report.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
              <p className="twin-kicker" style={{ marginTop: 14 }}>Weaknesses</p>
              <ul className="twin-report-list bad">{report.weaknesses.map((w) => <li key={w}>{w}</li>)}</ul>
              <div className="twin-critical-callout" style={{ marginTop: 16 }}>
                <div><strong>Recommended practice</strong><p>{report.recommendedPractice}</p></div>
                <button className="twin-button">Start "{report.nextMission}" <ArrowUpRight size={13} /></button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="twin-grid">
      <section className="twin-col-12">
        <div className="twin-mode-grid">
          {interviewModes.map((mode) => (
            <button key={mode.id} className="twin-mode-card" onClick={() => setActiveMode(mode.id)}>
              <span className="twin-mode-icon"><BrainCircuit size={16} /></span>
              <strong>{mode.label}</strong>
              <span>{mode.description}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function CompanyFitTab() {
  const [targetId, setTargetId] = useState(companyFitTargets[0].id);
  const target = companyFitTargets.find((t) => t.id === targetId)!;
  const bars = useMemo(() => ([
    ['Skill Match', target.fit.skillMatch],
    ['Coding Match', target.fit.codingMatch],
    ['Project Match', target.fit.projectMatch],
    ['Resume Match', target.fit.resumeMatch],
    ['Communication', target.fit.communication],
    ['Interview Readiness', target.fit.interviewReadiness],
  ] as [string, number][]), [target]);
  return (
    <div className="twin-grid">
      <section className="twin-panel twin-col-7">
        <div className="twin-role-select">
          {companyFitTargets.map((t) => (
            <button key={t.id} className={`twin-role-chip ${targetId === t.id ? 'twin-role-chip-active' : ''}`} onClick={() => setTargetId(t.id)}>{t.company} · {t.role}</button>
          ))}
        </div>
        <div className="twin-fit-header">
          <div className="twin-fit-score"><strong>{target.fit.overallFit}%</strong><span>current fit</span></div>
          <span className="twin-delta"><TrendingUp size={13} />{target.fit.predictedFitAfterMissions}% predicted after missions</span>
        </div>
        <div className="twin-fit-bars">
          {bars.map(([label, value]) => (
            <div className="twin-fit-bar-row" key={label}>
              <span>{label}</span>
              <div className="twin-dna-track"><span className="twin-dna-fill" style={{ width: `${value}%` }} /></div>
              <b>{value}%</b>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <p className="twin-kicker">Missing</p>
          <div style={{ marginTop: 6 }}>{target.fit.missing.map((m) => <span className="twin-missing-pill" key={m}>{m}</span>)}</div>
        </div>
        <div className="twin-predicted">
          <span style={{ color: 'var(--twin-ivory-dim)', fontSize: 12 }}>Predicted fit after completing missions</span>
          <strong>{target.fit.predictedFitAfterMissions}%</strong>
        </div>
      </section>

      <section className="twin-panel twin-col-5">
        <div className="twin-panel-title"><div><p className="twin-kicker">Placement Simulator</p><h2>Virtual placement season</h2></div><CheckCircle2 size={17} /></div>
        <div style={{ marginTop: 12 }}>
          {placementSimulatorStages.map((stage) => (
            <div className="twin-stage-row" key={stage.id}>
              <span className={`twin-stage-dot ${stage.status}`} />
              <div>
                <strong>{stage.label}</strong>
                <p>{stage.detail}</p>
              </div>
              <span className={`twin-stage-tag ${stage.status}`}>{stage.status.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CareerTwin() {
  const [tab, setTab] = useState<TwinTab>('Dashboard');
  return (
    <div className="twin-app">
      <div className="twin-heading">
        <div>
          <p className="twin-eyebrow"><Sparkles size={12} /> AI Career Operating System</p>
          <h1>Your Career Twin</h1>
          <p>A living model of your career readiness — built from academics, code, projects, resume, and interview performance — with missions generated to close every gap.</p>
        </div>
      </div>
      <TwinTabs tab={tab} setTab={setTab} />
      <div className="twin-view">
        {tab === 'Dashboard' && <DashboardTab />}
        {tab === 'Skill Gap' && <SkillGapTab />}
        {tab === 'Missions' && <MissionsTab />}
        {tab === 'Interview Arena' && <InterviewArenaTab />}
        {tab === 'Company Fit' && <CompanyFitTab />}
      </div>
    </div>
  );
}

export default CareerTwin;
