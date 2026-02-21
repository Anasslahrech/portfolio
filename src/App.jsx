import { useState, useEffect, useRef, useCallback } from "react"
import emailjs from "@emailjs/browser"
import { NAV, TITLES, SKILLS, PROJECTS, PROJECT_FILTERS, STAGES, STATS, CONTACT_LINKS } from "./data"

// ── EMAILJS CONFIG ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_qhn7ofc"    // ← remplace par ton Service ID
const EMAILJS_TEMPLATE_ID = "template_0kmuw6v"   // ← remplace par ton Template ID
const EMAILJS_PUBLIC_KEY  = "seuknB9f3AJYg2LgF" // ← remplace par ta Public Key

// ── UTILS ──────────────────────────────────────────────────────────────────────
function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function downloadCV() {
  const link = document.createElement("a")
  link.href = "/LahrechAnassCV.pdf"
  link.download = "CV_Anass_Lahrech.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// ── HOOKS ──────────────────────────────────────────────────────────────────────
function useScrollAnim() {
  useEffect(() => {
    const els = document.querySelectorAll(
      ".anim-left, .anim-right, .anim-up, .anim-down, .anim-zoom, .anim-flip"
    )
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animated")
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

// ── SCROLL PROGRESS ────────────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const fn = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  )
}

// ── NAVBAR ─────────────────────────────────────────────────────────────────────
function Navbar({ active, menuOpen, setMenuOpen }) {
  return (
    <>
      <nav className="nav" role="navigation" aria-label="Navigation principale">
        <div
          className="nav-logo"
          onClick={() => goTo("Accueil")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && goTo("Accueil")}
          aria-label="Retour à l'accueil"
        >
          Anass Lahrech<span className="nav-logo-dot gc">.</span>
        </div>

        <ul className="nav-links" role="list" style={{ listStyle: "none" }}>
          {NAV.map((n) => (
            <li key={n}>
              <button
                className={`nav-btn${active === n ? " active" : ""}`}
                onClick={() => goTo(n)}
                aria-current={active === n ? "page" : undefined}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a
            href="#"
            className="nav-cv-btn"
            onClick={(e) => { e.preventDefault(); downloadCV() }}
            aria-label="Télécharger mon CV en PDF"
          >
            📄 CV
          </a>
          <button className="nav-cta" onClick={() => goTo("Contact")}>
            Contactez-moi
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        {NAV.map((n) => (
          <button
            key={n}
            className="nav-btn"
            onClick={() => { goTo(n); setMenuOpen(false) }}
          >
            {n}
          </button>
        ))}
        <a
          href="#"
          className="nav-cv-btn mobile-cv"
          onClick={(e) => { e.preventDefault(); downloadCV(); setMenuOpen(false) }}
        >
          📄 Télécharger CV
        </a>
      </div>
    </>
  )
}

// ── ANIMATED STAT ──────────────────────────────────────────────────────────────
function AnimatedStat({ num, suffix, label }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const count = useCountUp(num, 1400, started)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="hero-stat" ref={ref}>
      <div className="stat-num">
        <em>{started ? count : 0}</em>{suffix}
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  )
}

// ── HERO SECTION ───────────────────────────────────────────────────────────────
function HeroSection() {
  const [typed, setTyped] = useState("")
  const [tidx, setTidx] = useState(0)
  const tiRef = useRef(null)

  useEffect(() => {
    let i = 0
    const cur = TITLES[tidx]
    clearInterval(tiRef.current)
    tiRef.current = setInterval(() => {
      i++
      setTyped(cur.slice(0, i))
      if (i >= cur.length) {
        clearInterval(tiRef.current)
        setTimeout(() => {
          let d = cur.length
          tiRef.current = setInterval(() => {
            d--
            setTyped(cur.slice(0, d))
            if (d <= 0) {
              clearInterval(tiRef.current)
              setTidx((p) => (p + 1) % TITLES.length)
            }
          }, 40)
        }, 2000)
      }
    }, 75)
    return () => clearInterval(tiRef.current)
  }, [tidx])

  return (
    <section id="Accueil" className="hero" aria-label="Accueil">
      <div className="hero-glow1" aria-hidden="true" />
      <div className="hero-glow2" aria-hidden="true" />
      <div className="hero-dots"  aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-badge anim-down">
          <span className="badge-dot" aria-hidden="true" />
          Disponible pour stage PFE &amp; emploi
        </div>

        <h1 className="hero-name anim-zoom">
          Anass<br />
          <span className="hero-name-ghost">Lahrech</span>
        </h1>

        <div className="hero-typing anim-up">
          {typed}
          <span className="cursor-bar" aria-hidden="true" />
        </div>

        <p className="hero-desc anim-up delay-1">
          Étudiant-ingénieur 4ème année · Option Intelligence Artificielle · ISMAGI
          <br />
          Titulaire d'une Licence en Développement Web &amp; Mobile (2025)
        </p>

        <div className="hero-btns anim-up delay-2">
          <button className="btn-main" onClick={() => goTo("Projets")}>
            Voir mes projets →
          </button>
          <button className="btn-outline" onClick={() => goTo("Contact")}>
            Me contacter
          </button>
          <a
            href="#"
            className="btn-cv"
            onClick={(e) => { e.preventDefault(); downloadCV() }}
          >
            📄 Télécharger CV
          </a>
        </div>

        <div className="hero-stats anim-up delay-3">
          {STATS.map((s) => (
            <AnimatedStat key={s.label} {...s} />
          ))}
        </div>
      </div>

      <div className="hero-photo-wrap">
        <div className="hero-photo-ring">
          <img
            src="/photo.jpg"
            alt="Anass Lahrech"
            className="hero-photo"
            onError={(e) => { e.target.style.display = "none" }}
          />
        </div>
        <div className="hero-photo-badge">🎓 Lauréat ISMAGI 2025</div>
      </div>
    </section>
  )
}

// ── ABOUT SECTION ──────────────────────────────────────────────────────────────
function AboutSection({ visible }) {
  return (
    <section
      id="À propos"
      className={`section alt-bg${visible["À propos"] ? " visible" : ""}`}
      aria-label="À propos"
    >
      <div className="s-header anim-zoom">
        <div className="s-eyebrow">01 — À propos</div>
        <h2 className="s-title">Qui suis-je ?</h2>
        <p className="s-sub">Ingénieur passionné par l'IA et le développement logiciel.</p>
      </div>

      <div className="about-grid">
        <div className="anim-left">
          <p className="about-p">
            Je suis étudiant-ingénieur en 4ème année Génie Informatique, option{" "}
            <em>Intelligence Artificielle</em> à l'ISMAGI. Titulaire d'une{" "}
            <strong>Licence en Développement Web et Mobile</strong> obtenue en 2025.
          </p>
          <p className="about-p">
            J'ai développé une expérience solide à travers <em>9 projets</em> couvrant le
            développement full-stack, mobile, les APIs, la data science et l'IA — ainsi
            que <em>2 stages</em> en entreprise dont un stage PFE chez Asment Temara.
          </p>
          <p className="about-p">
            Rigoureux, autonome et passionné d'innovation, je cherche à mettre mes
            compétences au service de challenges techniques à fort impact.
          </p>

          <div className="lang-section">
            <div className="lang-title">Langues</div>
            <div className="lang-pills">
              {[
                ["Arabe",   "Maternelle"],
                ["Français","C1 — Courant"],
                ["Anglais", "B1/B2"],
              ].map(([n, l]) => (
                <div key={n} className="lang-pill">
                  <span className="lang-n">{n}</span>
                  <span className="lang-l">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-stats anim-right">
          {[
            ["9+",   "Projets réalisés"],
            ["2",    "Stages effectués"],
            ["15+",  "Technologies"],
            ["4ème", "Année Cycle Ingénieur"],
          ].map(([n, l]) => (
            <div key={l} className="scard">
              <div className="scard-n">{n}</div>
              <div className="scard-l">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SKILLS SECTION ─────────────────────────────────────────────────────────────
function SkillsSection({ visible }) {
  return (
    <section
      id="Compétences"
      className={`section${visible["Compétences"] ? " visible" : ""}`}
      aria-label="Compétences"
    >
      <div className="s-header anim-zoom">
        <div className="s-eyebrow">02 — Compétences</div>
        <h2 className="s-title">Stack technique</h2>
        <p className="s-sub">Technologies maîtrisées à travers projets et stages.</p>
      </div>

      <div className="skills-grid">
        {SKILLS.map((sk, i) => (
          <div key={sk.cat} className={`skill-card anim-up delay-${(i % 9) + 1}`}>
            <div className="sk-icon">{sk.icon}</div>
            <div className="sk-name">{sk.cat}</div>
            <div className="sk-tags">
              {sk.items.map((t) => (
                <span key={t} className="sk-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── PROJECTS SECTION ───────────────────────────────────────────────────────────
function ProjectsSection({ visible, onVideoOpen }) {
  const [activeFilter, setActiveFilter] = useState("Tous")
  const filtered =
    activeFilter === "Tous"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags?.includes(activeFilter))

  return (
    <section
      id="Projets"
      className={`section alt-bg${visible["Projets"] ? " visible" : ""}`}
      aria-label="Projets"
    >
      <div className="s-header anim-zoom">
        <div className="s-eyebrow">03 — Projets</div>
        <h2 className="s-title">Ce que j'ai construit</h2>
        <p className="s-sub">
          J'ai réalisé plusieurs projets tout au long de ma formation — voici quelques-uns
          qui illustrent mes compétences en web, mobile, IA et data science.
        </p>
      </div>

      <div className="filter-bar" role="group" aria-label="Filtrer les projets">
        {PROJECT_FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn${activeFilter === f ? " active" : ""}`}
            onClick={() => setActiveFilter(f)}
            aria-pressed={activeFilter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="projects-grid" key={activeFilter}>
        {filtered.length > 0 ? (
          filtered.map((p, i) => (
            <article
              key={p.title}
              className={`pcard pcard-enter anim-up delay-${(i % 9) + 1}`}
            >
              <div className="pcard-num">
                Projet {String(PROJECTS.indexOf(p) + 1).padStart(2, "0")}
              </div>
              <div className="pcard-ico">{p.icon}</div>
              <h3 className="pcard-title">{p.title}</h3>
              <p className="pcard-desc">{p.desc}</p>
              <div className="pcard-techs">
                {p.tech.map((t) => (
                  <span key={t} className="pcard-tech">{t}</span>
                ))}
              </div>
              <button
                className="pcard-demo-btn"
                onClick={() => onVideoOpen(p)}
                aria-label={`Voir la démo de ${p.title}`}
              >
                <span className="pcard-demo-icon" aria-hidden="true">▶</span>
                Voir la démo
              </button>
            </article>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <div className="no-results-text">Aucun projet pour ce filtre</div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── STAGES SECTION ─────────────────────────────────────────────────────────────
function StagesSection({ visible }) {
  return (
    <section
      id="Stages"
      className={`section${visible["Stages"] ? " visible" : ""}`}
      aria-label="Stages"
    >
      <div className="s-header anim-zoom">
        <div className="s-eyebrow">04 — Expériences</div>
        <h2 className="s-title">Stages professionnels</h2>
        <p className="s-sub">
          Expériences en entreprise qui ont façonné mes compétences terrain.
        </p>
      </div>

      <div className="timeline">
        {STAGES.map((st, i) => (
          <div
            key={st.company}
            className={`tl-item anim-${i % 2 === 0 ? "left" : "right"} delay-${i + 1}`}
          >
            <div className="tl-dot" aria-hidden="true" />
            <div className="stg-card">
              <div className="stg-top">
                <div>
                  <div className="stg-company">{st.company}</div>
                  <div className="stg-role">{st.role}</div>
                </div>
                <div className="stg-meta">
                  <span className="stg-period">{st.period}</span>
                  <span className="stg-loc">📍 {st.loc}</span>
                </div>
              </div>
              <p className="stg-desc">{st.desc}</p>
              <div className="stg-tags">
                {st.tech.map((t) => (
                  <span key={t} className="stg-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── CONTACT FORM avec EmailJS ──────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Le nom est requis"
    if (!form.email.trim()) e.email = "L'email est requis"
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide"
    if (!form.message.trim()) e.message = "Le message est requis"
    else if (form.message.trim().length < 10)
      e.message = "Message trop court (min. 10 caractères)"
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus("sending")
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          reply_to:   form.email,
          to_email:   "anas.lahrech13@gmail.com",
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch (err) {
      console.error("EmailJS error:", err)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  if (status === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✅</div>
        <div className="form-success-title">Message envoyé !</div>
        <div className="form-success-sub">Je vous répondrai dans les plus brefs délais.</div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div
        className="form-success"
        style={{ borderColor: "rgba(255,80,80,0.4)", background: "rgba(255,80,80,0.04)" }}
      >
        <div className="form-success-icon">❌</div>
        <div className="form-success-title">Erreur d'envoi</div>
        <div className="form-success-sub">
          Vérifiez votre connexion ou contactez-moi directement à{" "}
          <a href="mailto:anas.lahrech13@gmail.com" style={{ color: "var(--green)" }}>
            anas.lahrech13@gmail.com
          </a>
        </div>
      </div>
    )
  }

  return (
    <form
      className="contact-form anim-up delay-5"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulaire de contact"
    >
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Nom complet</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-input${errors.name ? " error" : ""}`}
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            disabled={status === "sending"}
            autoComplete="name"
          />
          {errors.name && (
            <span className="form-error" role="alert">{errors.name}</span>
          )}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-input${errors.email ? " error" : ""}`}
            placeholder="votre@email.com"
            value={form.email}
            onChange={handleChange}
            disabled={status === "sending"}
            autoComplete="email"
          />
          {errors.email && (
            <span className="form-error" role="alert">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className={`form-textarea${errors.message ? " error" : ""}`}
          placeholder="Décrivez votre projet ou opportunité..."
          value={form.message}
          onChange={handleChange}
          rows={5}
          disabled={status === "sending"}
        />
        {errors.message && (
          <span className="form-error" role="alert">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="form-submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <span className="form-spinner" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer le message →"
        )}
      </button>
    </form>
  )
}

// ── CONTACT SECTION ────────────────────────────────────────────────────────────
function ContactSection({ visible }) {
  return (
    <section
      id="Contact"
      className={`section alt-bg${visible["Contact"] ? " visible" : ""}`}
      aria-label="Contact"
    >
      <div className="s-header anim-zoom">
        <div className="s-eyebrow">05 — Contact</div>
        <h2 className="s-title">Travaillons ensemble</h2>
        <p className="s-sub">
          Disponible pour un stage PFE, une alternance ou un poste junior en IA / Full-Stack.
        </p>
      </div>

      <div className="contact-grid">
        {CONTACT_LINKS.map((c, i) => (
          <a
            key={c.lbl}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className={`ccard ${["anim-left", "anim-up", "anim-up", "anim-right"][i]} delay-${i + 1}`}
            aria-label={`${c.lbl}: ${c.val}`}
          >
            <span className="ccard-ico" aria-hidden="true">{c.ico}</span>
            <span className="ccard-lbl">{c.lbl}</span>
            <span className="ccard-val">{c.val}</span>
            <span className="ccard-arr" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <ContactForm />

      <div className="cv-download-card anim-up delay-6">
        <div className="cv-card-left">
          <div className="cv-card-icon" aria-hidden="true">📄</div>
          <div>
            <div className="cv-card-title">Mon CV complet</div>
            <div className="cv-card-sub">
              Lahrech Anass — Ingénieur IA &amp; Développeur Full-Stack · PDF
            </div>
          </div>
        </div>
        <a
          className="cv-dl-btn"
          href="#"
          onClick={(e) => { e.preventDefault(); downloadCV() }}
          aria-label="Télécharger le CV en PDF"
        >
          ⬇ Télécharger le CV
        </a>
      </div>
    </section>
  )
}

// ── VIDEO MODAL ────────────────────────────────────────────────────────────────
function VideoModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [project, onClose])

  if (!project) return null

  const getEmbedUrl = (url) => {
    if (!url) return null
    if (url.includes("youtube.com/watch")) {
      const id = url.split("v=")[1]?.split("&")[0]
      return `https://www.youtube.com/embed/${id}?autoplay=1`
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0]
      return `https://www.youtube.com/embed/${id}?autoplay=1`
    }
    if (url.includes("drive.google.com")) {
      const id = url.match(/[-\w]{25,}/)?.[0]
      return `https://drive.google.com/file/d/${id}/preview`
    }
    return url
  }

  const embedUrl = getEmbedUrl(project.video)
  const isLocal = project.video && /\.(mp4|webm|mov)$/i.test(project.video)

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Démo de ${project.title}`}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon" aria-hidden="true">{project.icon}</span>
            <div>
              <div className="modal-title">{project.title}</div>
              <div className="modal-sub">Démonstration du projet</div>
            </div>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Fermer la modale"
          >
            ✕
          </button>
        </div>

        <div className="modal-video-wrap">
          {isLocal ? (
            <video
              src={project.video}
              className="modal-video"
              controls
              autoPlay
              playsInline
            />
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={project.title}
              className="modal-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="modal-no-video">
              <div className="modal-no-video-icon" aria-hidden="true">🎬</div>
              <div className="modal-no-video-title">Vidéo bientôt disponible</div>
              <div className="modal-no-video-sub">
                La démonstration de <strong>{project.title}</strong> sera ajoutée prochainement.
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="modal-techs">
            {project.tech.map((t) => (
              <span key={t} className="modal-tech">{t}</span>
            ))}
          </div>
          <button className="modal-close-btn" onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  )
}

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive]           = useState("Accueil")
  const [menuOpen, setMenuOpen]       = useState(false)
  const [visible, setVisible]         = useState({})
  const [activeVideo, setActiveVideo] = useState(null)

  // Section visibility for fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((v) => ({ ...v, [e.target.id]: true }))
        })
      },
      { threshold: 0.08 }
    )
    NAV.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Active nav link tracking on scroll
  useEffect(() => {
    const fn = () => {
      NAV.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 80 && r.bottom >= 80) setActive(id)
        }
      })
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 900) setMenuOpen(false) }
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])

  useScrollAnim()

  const handleVideoOpen  = useCallback((p) => setActiveVideo(p), [])
  const handleVideoClose = useCallback(() => setActiveVideo(null), [])

  return (
    <>
      <ScrollProgress />
      <Navbar active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <HeroSection />
        <AboutSection    visible={visible} />
        <SkillsSection   visible={visible} />
        <ProjectsSection visible={visible} onVideoOpen={handleVideoOpen} />
        <StagesSection   visible={visible} />
        <ContactSection  visible={visible} />
      </main>
      <VideoModal project={activeVideo} onClose={handleVideoClose} />
      <footer className="footer">
        <div className="footer-l">
          © 2025 <strong>Anass Lahrech</strong> — Ingénieur IA &amp; Développeur Full-Stack
        </div>
        
      </footer>
    </>
  )
}