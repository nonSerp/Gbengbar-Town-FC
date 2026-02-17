// src/components/ContactForm.jsx
// Usage: <ContactForm client:load />
// Replace YOUR_FORMSPREE_ID with your form id from formspree.io
// e.g. https://formspree.io/f/xpwzqkdo → id = "xpwzqkdo"

import { useState, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";

const FORMSPREE_ID = "mqedbwwg"; // ← swap this

// ─── tiny design tokens (match global CSS vars) ───
const T = {
  green:   "#1a4d2e",
  gold:    "#f4b53f",
  goldHov: "#ffc84a",
  dark:    "#0a1f14",
  light:   "#f5f5f5",
  glass:   "rgba(255,255,255,.04)",
  border:  "rgba(26,77,46,.6)",
  borderFocus: "#f4b53f",
  error:   "#e05a5a",
  muted:   "rgba(245,245,245,.4)",
};

// ─── reusable style builders ───
function inputStyle(hasError, isFocused) {
  return {
    width: "100%",
    background: T.glass,
    border: `1px solid ${hasError ? T.error : isFocused ? T.borderFocus : T.border}`,
    borderRadius: 8,
    color: T.light,
    fontFamily: "inherit",
    fontSize: ".93rem",
    fontWeight: 400,
    padding: ".82rem 1rem",
    outline: "none",
    transition: "border-color .22s, background .22s, box-shadow .22s",
    boxShadow: isFocused ? `0 0 0 3px rgba(244,181,63,.12)` : "none",
    appearance: "none",
    WebkitAppearance: "none",
    lineHeight: 1.5,
  };
}

function Field({ label, error, children, required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".38rem" }}>
      <label style={{
        fontSize: ".66rem", fontWeight: 700,
        letterSpacing: ".14em", textTransform: "uppercase",
        color: T.muted, userSelect: "none",
      }}>
        {label}{required && <span style={{ color: T.gold, marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: ".7rem", color: T.error, marginTop: ".05rem" }}>
          {error}
        </span>
      )}
    </div>
  );
}

// ─── main component ───
export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  // local validation
  const [touched, setTouched] = useState({});
  const [vals, setVals]       = useState({
    firstName: "", lastName: "", email: "",
    phone: "", subject: "", message: "", newsletter: false,
  });
  const [focused, setFocused] = useState({});

  const touch  = (name) => setTouched(t => ({ ...t, [name]: true }));
  const focus  = (name) => setFocused(f => ({ ...f, [name]: true }));
  const blur   = (name) => { setFocused(f => ({ ...f, [name]: false })); touch(name); };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVals(v => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  };

  // client-side errors (shown after field is touched)
  const errs = {};
  if (touched.firstName && !vals.firstName.trim())  errs.firstName = "First name is required";
  if (touched.lastName  && !vals.lastName.trim())   errs.lastName  = "Last name is required";
  if (touched.email) {
    if (!vals.email.trim())                         errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email))
                                                    errs.email = "Enter a valid email address";
  }
  if (touched.subject  && !vals.subject)            errs.subject = "Please choose a topic";
  if (touched.message) {
    if (!vals.message.trim())                       errs.message = "Message is required";
    else if (vals.message.trim().length < 15)       errs.message = "At least 15 characters please";
  }

  const hasErrors = Object.keys(errs).length > 0;

  // ── Success screen ──
  if (state.succeeded) {
    return (
      <>
        <style>{`
          @keyframes cf-pop {
            0%   { opacity:0; transform:scale(.92) translateY(12px); }
            60%  { transform:scale(1.03) translateY(-3px); }
            100% { opacity:1; transform:scale(1) translateY(0); }
          }
          @keyframes cf-check {
            0%   { stroke-dashoffset: 60; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
        <div style={{
          textAlign: "center",
          padding: "4rem 1.5rem",
          animation: "cf-pop .55s cubic-bezier(.22,1,.36,1) both",
        }}>
          {/* animated checkmark */}
          <div style={{
            width: 72, height: 72,
            background: "rgba(26,77,46,.35)",
            border: `2px solid ${T.gold}`,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.6rem",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                 stroke={T.gold} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"
                strokeDasharray="60" strokeDashoffset="0"
                style={{ animation: "cf-check .5s .15s ease both" }}
              />
            </svg>
          </div>

          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem,5vw,2.8rem)",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: T.light,
            marginBottom: ".6rem",
          }}>
            Message Sent!
          </h3>
          <p style={{
            fontSize: ".95rem",
            color: "rgba(245,245,245,.5)",
            lineHeight: 1.75,
            maxWidth: "30ch",
            margin: "0 auto 2rem",
          }}>
            Thanks for reaching out. We typically respond within <strong style={{ color: T.gold }}>24 hours</strong>.
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              background: "transparent",
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              color: T.muted,
              fontFamily: "inherit",
              fontSize: ".8rem",
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              padding: ".7rem 1.8rem",
              cursor: "pointer",
              transition: "border-color .2s, color .2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = T.gold; e.target.style.color = T.gold; }}
            onMouseLeave={e => { e.target.style.borderColor = T.border; e.target.style.color = T.muted; }}
          >
            Send Another
          </button>
        </div>
      </>
    );
  }

  // ── Form ──
  return (
    <>
      <style>{`
        .cf-row { display:grid; grid-template-columns:1fr 1fr; gap:1.1rem; }
        @media(max-width:520px){ .cf-row { grid-template-columns:1fr; } }

        .cf-submit:hover:not(:disabled) {
          background: ${T.goldHov} !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(244,181,63,.3);
        }
        .cf-submit:active:not(:disabled) {
          transform: translateY(0) !important;
          box-shadow: none !important;
        }
        .cf-submit .arrow { transition: translate .22s; display:inline-flex; }
        .cf-submit:hover:not(:disabled) .arrow { translate: 5px 0; }

        .cf-card:hover { border-color:${T.gold} !important; background:rgba(244,181,63,.06) !important; transform:translateX(5px); }

        /* placeholder color */
        .cf-input::placeholder, .cf-ta::placeholder { color:rgba(245,245,245,.18); }
      `}</style>

      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}
      >

        {/* ── Row: first / last name ── */}
        <div className="cf-row">
          <Field label="First Name" required error={errs.firstName}>
            <input
              className="cf-input"
              name="firstName" type="text"
              placeholder="John" autoComplete="given-name"
              value={vals.firstName}
              onChange={onChange}
              onFocus={() => focus("firstName")}
              onBlur={() => blur("firstName")}
              style={inputStyle(!!errs.firstName, focused.firstName)}
            />
          </Field>

          <Field label="Last Name" required error={errs.lastName}>
            <input
              className="cf-input"
              name="lastName" type="text"
              placeholder="Doe" autoComplete="family-name"
              value={vals.lastName}
              onChange={onChange}
              onFocus={() => focus("lastName")}
              onBlur={() => blur("lastName")}
              style={inputStyle(!!errs.lastName, focused.lastName)}
            />
          </Field>
        </div>

        {/* ── Email ── */}
        <Field label="Email Address" required error={errs.email}>
          <input
            className="cf-input"
            name="email" type="email"
            placeholder="john@example.com" autoComplete="email"
            value={vals.email}
            onChange={onChange}
            onFocus={() => focus("email")}
            onBlur={() => blur("email")}
            style={inputStyle(!!errs.email, focused.email)}
          />
          {/* Formspree built-in email error */}
          <ValidationError
            prefix="Email" field="email"
            errors={state.errors}
            style={{ fontSize: ".7rem", color: T.error, marginTop: ".05rem" }}
          />
        </Field>

        {/* ── Row: phone / subject ── */}
        <div className="cf-row">
          <Field label="Phone">
            <input
              className="cf-input"
              name="phone" type="tel"
              placeholder="+231 770 536706" autoComplete="tel"
              value={vals.phone}
              onChange={onChange}
              onFocus={() => focus("phone")}
              onBlur={() => blur("phone")}
              style={inputStyle(false, focused.phone)}
            />
          </Field>

          <Field label="Subject" required error={errs.subject}>
            <div style={{ position: "relative" }}>
              <select
                name="subject"
                value={vals.subject}
                onChange={onChange}
                onFocus={() => focus("subject")}
                onBlur={() => blur("subject")}
                style={{
                  ...inputStyle(!!errs.subject, focused.subject),
                  paddingRight: "2.5rem",
                  cursor: "pointer",
                  backgroundImage: "none",
                }}
              >
                <option value="" disabled>Select topic</option>
                <option value="general">General Inquiry</option>
                <option value="membership">Membership</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="events">Events</option>
                <option value="media">Media &amp; Press</option>
                <option value="other">Other</option>
              </select>
              {/* custom chevron */}
              <svg
                style={{ position:"absolute", right:12, top:"50%", translate:"0 -50%", pointerEvents:"none", opacity:.4 }}
                width="10" height="10" viewBox="0 0 10 10" fill="none"
              >
                <path d="M1 3l4 4 4-4" stroke={T.light} strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
          </Field>
        </div>

        {/* ── Message ── */}
        <Field label="Message" required error={errs.message}>
          <textarea
            className="cf-ta"
            name="message"
            placeholder="Tell us how we can help…"
            rows={5}
            value={vals.message}
            onChange={onChange}
            onFocus={() => focus("message")}
            onBlur={() => blur("message")}
            style={{
              ...inputStyle(!!errs.message, focused.message),
              resize: "vertical",
              lineHeight: 1.7,
              minHeight: 130,
            }}
          />
          <ValidationError
            prefix="Message" field="message"
            errors={state.errors}
            style={{ fontSize: ".7rem", color: T.error, marginTop: ".05rem" }}
          />
        </Field>

        {/* ── Newsletter opt-in ── */}
        <label style={{
          display: "flex", alignItems: "flex-start",
          gap: ".7rem", cursor: "pointer",
        }}>
          <input
            type="checkbox"
            name="newsletter"
            checked={vals.newsletter}
            onChange={onChange}
            style={{
              width: 18, height: 18, minWidth: 18,
              accentColor: T.gold,
              cursor: "pointer",
              marginTop: 2,
            }}
          />
          <span style={{ fontSize: ".83rem", color: "rgba(245,245,245,.42)", lineHeight: 1.6 }}>
            Subscribe to our newsletter for club updates, match news &amp; more.
          </span>
        </label>

        {/* ── Formspree global error ── */}
        {state.errors && state.errors.length > 0 && (
          <div style={{
            background: "rgba(224,90,90,.12)",
            border: `1px solid rgba(224,90,90,.4)`,
            borderRadius: 8,
            padding: ".85rem 1rem",
            fontSize: ".85rem",
            color: "#e05a5a",
          }}>
            Something went wrong. Please check your details and try again.
          </div>
        )}

        {/* ── Submit button ── */}
        <button
          type="submit"
          className="cf-submit"
          disabled={state.submitting || hasErrors}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".65rem",
            width: "100%",
            background: (state.submitting || hasErrors) ? "rgba(244,181,63,.5)" : T.gold,
            color: T.dark,
            border: "none",
            borderRadius: 8,
            fontFamily: "inherit",
            fontSize: ".95rem",
            fontWeight: 700,
            letterSpacing: ".05em",
            padding: "1rem 2rem",
            cursor: (state.submitting || hasErrors) ? "not-allowed" : "pointer",
            transition: "background .25s, transform .2s, box-shadow .25s",
            marginTop: ".2rem",
          }}
        >
          {state.submitting ? (
            <>
              {/* spinner */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                   stroke={T.dark} strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" strokeOpacity=".25"/>
                <path d="M12 2a10 10 0 0 1 10 10">
                  <animateTransform attributeName="transform" type="rotate"
                    from="0 12 12" to="360 12 12" dur=".75s" repeatCount="indefinite"/>
                </path>
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send Message
              <span className="arrow">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                     stroke={T.dark} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </>
          )}
        </button>

        <p style={{ fontSize: ".72rem", color: "rgba(245,245,245,.25)", textAlign: "center", marginTop: "-.4rem" }}>
          Powered by Formspree · Your data is never sold or shared.
        </p>
      </form>
    </>
  );
}
