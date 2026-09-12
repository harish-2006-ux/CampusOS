import { AlertTriangle, BarChart3, Building2, GitBranch, Sparkles, Users } from 'lucide-react';
import './career-twin.css';
import { campusIntelligence } from '@/lib/career-twin-data';

function CampusIntelligence() {
  const d = campusIntelligence;
  const maxFunnel = d.funnel[0]?.count ?? 1;
  return (
    <div className="twin-app">
      <div className="twin-heading">
        <div>
          <p className="twin-eyebrow"><Building2 size={12} /> College Career Intelligence</p>
          <h1>Campus placement command center</h1>
          <p>A live read on readiness, risk, and skill supply across the whole student body — not just a table of names.</p>
        </div>
      </div>

      <div className="twin-grid" style={{ marginTop: 24 }}>
        <section className="twin-col-12">
          <div className="twin-admin-stat-grid">
            <div className="twin-stat"><span>Total students</span><strong>{d.totalStudents}</strong></div>
            <div className="twin-stat"><span>Placement ready</span><strong>{d.placementReady}</strong><small>{Math.round((d.placementReady / d.totalStudents) * 100)}% of cohort</small></div>
            <div className="twin-stat"><span>Near ready</span><strong>{d.nearReady}</strong></div>
            <div className="twin-stat"><span>High risk</span><strong style={{ color: 'var(--twin-red)' }}>{d.highRisk}</strong></div>
            <div className="twin-stat"><span>Avg readiness</span><strong>{d.avgReadiness}%</strong></div>
          </div>
        </section>

        <section className="twin-panel twin-col-6">
          <div className="twin-panel-title"><div><p className="twin-kicker">Patterns</p><h2>What the data is telling us</h2></div><AlertTriangle size={17} /></div>
          <div style={{ marginTop: 10 }}>
            {d.insights.map((insight) => (
              <div className="twin-insight-row" key={insight}><Sparkles size={14} /><span>{insight}</span></div>
            ))}
          </div>
        </section>

        <section className="twin-panel twin-col-6">
          <div className="twin-panel-title"><div><p className="twin-kicker">Department comparison</p><h2>Readiness by department</h2></div><Users size={17} /></div>
          <div style={{ marginTop: 10 }}>
            {d.departmentComparison.map((dep) => (
              <div className="twin-dept-row" key={dep.department}>
                <span>{dep.department}</span>
                <div className="twin-dna-track"><span className="twin-dna-fill" style={{ width: `${dep.avgReadiness}%` }} /></div>
                <b>{dep.avgReadiness}%</b>
              </div>
            ))}
          </div>
        </section>

        <section className="twin-panel twin-col-6">
          <div className="twin-panel-title"><div><p className="twin-kicker">Skill demand vs campus supply</p><h2>Where the campus is under-building</h2></div><BarChart3 size={17} /></div>
          <div style={{ marginTop: 10 }}>
            {d.skillDemandVsSupply.map((s) => (
              <div key={s.skill} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--twin-ivory-dim)', marginBottom: 4 }}>
                  <span>{s.skill}</span><span>{s.demand - s.supply > 15 ? 'Under-supplied' : 'Balanced'}</span>
                </div>
                <div className="twin-dna-track" style={{ position: 'relative' }}>
                  <span className="twin-dna-fill" style={{ width: `${s.demand}%`, background: 'rgba(232,164,99,0.55)' }} />
                </div>
                <div className="twin-dna-track" style={{ marginTop: 4 }}>
                  <span className="twin-dna-fill" style={{ width: `${s.supply}%` }} />
                </div>
              </div>
            ))}
            <p style={{ color: 'var(--twin-ivory-dim)', fontSize: 10.5, marginTop: 4 }}>Amber = demand · Violet/cyan = campus supply</p>
          </div>
        </section>

        <section className="twin-panel twin-col-6">
          <div className="twin-panel-title"><div><p className="twin-kicker">Placement funnel</p><h2>Where students drop off</h2></div><GitBranch size={17} /></div>
          <div style={{ marginTop: 10 }}>
            {d.funnel.map((f) => (
              <div className="twin-funnel-row" key={f.stage}>
                <span>{f.stage}</span>
                <div className="twin-dna-track"><span className="twin-dna-fill" style={{ width: `${(f.count / maxFunnel) * 100}%` }} /></div>
                <b>{f.count}</b>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CampusIntelligence;
