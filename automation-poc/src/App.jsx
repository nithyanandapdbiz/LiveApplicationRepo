import { useState, useEffect } from 'react'

export default function App() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      num: '01',
      title: 'Continuous Integration',
      desc: 'Every commit is automatically built, tested, and validated before reaching production.'
    },
    {
      num: '02',
      title: 'Zero-touch Deployments',
      desc: 'Push to main and let the pipeline handle the rest — from artifact to live environment.'
    },
    {
      num: '03',
      title: 'Observability First',
      desc: 'Logs, metrics, and traces are wired in from day one. No surprises in production.'
    }
  ]

  return (
    <div className="page">
      <div className="grain" />

      <header className="nav">
        <div className="logo">
          <span className="logo-mark">◆</span>
          <span className="logo-text">automation/poc</span>
        </div>
        <div className="nav-meta">
          <span className="status">
            <span className="dot" /> live
          </span>
          <span className="clock">{time.toLocaleTimeString('en-GB')}</span>
        </div>
      </header>

      <main className="hero">
        <div className="eyebrow">— Proof of Concept · v0.1</div>
        <h1 className="title">
          Ship software <em>without</em>
          <br />
          touching the steering wheel.
        </h1>
        <p className="lede">
          A lightweight demonstration of end-to-end automation —
          from a developer's keystroke to a deployed, observable, production-ready service.
        </p>

        <div className="cta-row">
          <a className="cta primary" href="#features">
            Explore the pipeline →
          </a>
          <a className="cta ghost" href="#" onClick={(e) => e.preventDefault()}>
            View source
          </a>
        </div>
      </main>

      <section id="features" className="features">
        {features.map((f) => (
          <article key={f.num} className="feature">
            <div className="feature-num">{f.num}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </article>
        ))}
      </section>

      <footer className="footer">
        <div>© 2026 — built as a POC. No warranty, no promises.</div>
        <div className="footer-meta">
          <span>region · ap-south-1</span>
          <span>build · #00042</span>
        </div>
      </footer>
    </div>
  )
}
