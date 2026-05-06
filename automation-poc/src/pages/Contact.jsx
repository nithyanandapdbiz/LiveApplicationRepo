import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="page" data-testid="contact-page1">
      <div className="pageq-header3" data-testid="contact-header115">
        <h1>Get in touch</h1>
        <p className="page-subtitle1">
          Have a question, suggestion, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="contact-grid" data-testid="contact-grid">
        <div className="contact-info" data-testid="contact-info">
          <div className="info-block" data-testid="contact-email-block">
            <div className="info-label">Email</div>
            <div className="info-value">hello@shoply.example</div>
          </div>
          <div className="info-block" data-testid="contact-phone-block">
            <div className="info-label">Phone</div>
            <div className="info-value">+1 (555) 010-1234</div>
          </div>
          <div className="info-block" data-testid="contact-address-block">
            <div className="info-label">Address</div>
            <div className="info-value">
              123 Market Street
              <br />
              Suite 400
              <br />
              San Francisco, CA 94103
            </div>
          </div>
          <div className="info-block" data-testid="contact-hours-block">
            <div className="info-label">Hours</div>
            <div className="info-value">
              Mon–Fri · 9:00–18:00
              <br />
              Sat · 10:00–16:00
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
          {submitted && (
            <div className="form-success" data-testid="form-success">
              ✓ Thanks! We'll get back to you within 24 hours.
            </div>
          )}

          <label data-testid="contact-name-label">
            <span>Name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-testid="contact-name-input"
            />
          </label>
          <label data-testid="contact-email-label">
            <span>Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              data-testid="contact-email-input"
            />
          </label>
          <label data-testid="contact-message-label">
            <span>Message</span>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              data-testid="contact-message-input"
            />
          </label>
          <button type="submit" className="btn btn-primary btn-block" data-testid="contact-submit-btn">
            Send message
          </button>
        </form>
      </div>
    </div>
  )
}
