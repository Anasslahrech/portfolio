import { useState, useEffect, useRef } from "react"

const NAV = ["Accueil", "À propos", "Compétences", "Projets", "Stages", "Contact"]
const TITLES = ["Ingénieur IA", "Développeur Full-Stack", "Data Scientist", "Mobile Developer"]

const SKILLS = [
  { icon:"🤖", cat:"IA / Machine Learning", items:["Python","TensorFlow","Keras","PyTorch","Scikit-learn","NLP","CNN","Deep Learning"] },
  { icon:"🎨", cat:"Web Frontend", items:["React.js","Vue.js","HTML5","CSS3","Bootstrap","JavaScript","TypeScript"] },
  { icon:"⚙️", cat:"Web Backend", items:["Laravel","Django","Node.js","Express","Spring Boot","PHP","REST API","SOAP","RMI"] },
  { icon:"📱", cat:"Mobile", items:["Android Java","Flutter","Dart"] },
  { icon:"🗄️", cat:"Bases de données", items:["MySQL","MongoDB","PostgreSQL","Firebase","SQLite"] },
  { icon:"🛠️", cat:"DevOps & Outils", items:["Git","GitHub","Docker","Postman","Linux","VS Code"] },
  { icon:"📊", cat:"Data Science", items:["Pandas","NumPy","Matplotlib","Seaborn","Jupyter Notebook"] },
  { icon:"💼", cat:"Bureautique & Design", items:["Word","Excel","PowerPoint","Canva"] },
]

const PROJECTS = [
  { icon:"📝", title:"Gestion des Examens", tech:["Java","JSP/Servlet","MySQL"], desc:"Plateforme CRUD complète pour la gestion des étudiants, questions et examens universitaires." },
  { icon:"💪", title:"App Fitness & Nutrition", tech:["Android Java","SQLite","XML"], desc:"App mobile Android avec calcul de calories et programmes personnalisés selon l'objectif de chaque utilisateur." },
  { icon:"🏛️", title:"Réservation Salles & Amphi", tech:["Java","REST API","SOAP","RMI","MySQL"], desc:"Système de réservation multi-protocoles pour amphithéâtres et salles — REST, SOAP et RMI." },
  { icon:"🛒", title:"E-commerce Sportif", tech:["Django","Python","MySQL","Bootstrap"], desc:"Plateforme e-commerce complète pour produits sportifs avec gestion du catalogue et des commandes." },
  { icon:"💼", title:"Site d'Offres d'Emploi", tech:["Laravel","PHP","MySQL","Bootstrap"], desc:"Portail emploi avec espaces distincts Candidat / Recruteur, candidatures et gestion des offres." },
  { icon:"🗺️", title:"Suivi Livraisons Temps Réel", tech:["Node.js","Express","MongoDB","Socket.IO","Google Maps"], desc:"Système de tracking temps réel avec carte interactive, mise à jour de position et interface dynamique." },
  { icon:"📋", title:"Gestionnaire de Contacts", tech:["Vue.js","Vue Router","Bootstrap","json-server"], desc:"Application CRUD de gestion de contacts avec navigation fluide et API simulée." },
  { icon:"📣", title:"Site Vitrine Marketing Digital", tech:["React.js","CSS3","Bootstrap"], desc:"Site vitrine professionnel pour agence de marketing digital, responsive et moderne." },
  { icon:"🖥️", title:"Gestion Matériel IT", tech:["Laravel","PHP","MySQL","Bootstrap"], desc:"Système de gestion du parc informatique d'Asment Temara — suivi et affectation des équipements IT." },
]

const STAGES = [
  { icon:"🏭", company:"Asment Temara", role:"Développeur Web — Stage PFE", period:"Juil — Août 2024 · 2 mois", loc:"Ain Atiq, Maroc", desc:"Développement d'une application web de gestion du parc matériel IT. CRUD complet, gestion des utilisateurs et tableau de bord de suivi des équipements.", tech:["Laravel","PHP","MySQL","Bootstrap"] },
  { icon:"🏛️", company:"Direction des Systèmes d'Information", role:"Stagiaire — Découverte Professionnelle", period:"2022 · 1 mois", loc:"Rabat Souissi, Maroc", desc:"Découverte d'une DSI publique, suivi du parc informatique, initiation aux infrastructures réseau et aux processus de gestion des systèmes d'information.", tech:["Systèmes d'information","Réseau","Parc IT"] },
]

function goTo(id) { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }) }

export default function App() {
  const [active, setActive] = useState("Accueil")
  const [menuOpen, setMenuOpen] = useState(false)
  const [typed, setTyped] = useState("")
  const [tidx, setTidx] = useState(0)
  const [visible, setVisible] = useState({})
  const tiRef = useRef(null)

  // typing
  useEffect(() => {
    let i = 0; const cur = TITLES[tidx]
    clearInterval(tiRef.current)
    tiRef.current = setInterval(() => {
      i++; setTyped(cur.slice(0,i))
      if(i >= cur.length) {
        clearInterval(tiRef.current)
        setTimeout(() => {
          let d = cur.length
          tiRef.current = setInterval(() => {
            d--; setTyped(cur.slice(0,d))
            if(d <= 0) { clearInterval(tiRef.current); setTidx(p => (p+1) % TITLES.length) }
          }, 40)
        }, 2000)
      }
    }, 75)
    return () => clearInterval(tiRef.current)
  }, [tidx])

  // intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) setVisible(v => ({...v,[e.target.id]:true})) })
    }, { threshold:0.08 })
    NAV.forEach(id => { const el = document.getElementById(id); if(el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // active on scroll
  useEffect(() => {
    const fn = () => NAV.forEach(id => {
      const el = document.getElementById(id)
      if(el) { const r = el.getBoundingClientRect(); if(r.top <= 80 && r.bottom >= 80) setActive(id) }
    })
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => goTo("Accueil")}>
          <span className="nav-logo-name">Anass Lahrech</span>
          <span className="nav-logo-dot">.</span>
        </div>
        <div className="nav-links">
          {NAV.map(n => (
            <button key={n} className={`nav-btn${active===n?" active":""}`}
              onClick={() => { goTo(n); setActive(n); }}>
              {n}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => goTo("Contact")}>Contactez-moi</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen?" open":""}`}>
        {NAV.map(n => (
          <button key={n} className={`nav-btn${active===n?" active":""}`}
            onClick={() => { goTo(n); setActive(n); setMenuOpen(false); }}>
            {n}
          </button>
        ))}
      </div>

      {/* HERO */}
      <section id="Accueil" className="hero">
        <div className="hero-glow1" /><div className="hero-glow2" /><div className="hero-dots" />
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="badge-dot" />
            Disponible pour stage PFE & emploi
          </div>
          <h1 className="hero-name">
            Anass <span className="hero-name-ghost">Lahrech</span>
          </h1>
          <div className="hero-typing">
            {typed}<span className="cursor-bar" />
          </div>
          <p className="hero-desc">
            Étudiant-ingénieur 4ème année · Option Intelligence Artificielle · ISMAGI<br />
            Titulaire d'une Licence en Développement Web & Mobile (2025)
          </p>
          <div className="hero-btns">
            <button className="btn-main" onClick={() => goTo("Projets")}>Voir mes projets →</button>
            <button className="btn-outline" onClick={() => goTo("Contact")}>Me contacter</button>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">9<em>+</em></div><div className="stat-lbl">Projets réalisés</div></div>
            <div><div className="stat-num">2</div><div className="stat-lbl">Stages effectués</div></div>
            <div><div className="stat-num">15<em>+</em></div><div className="stat-lbl">Technologies</div></div>
            <div><div className="stat-num">4<em>ème</em></div><div className="stat-lbl">Année Ingénieur</div></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="À propos" className={`section${visible["À propos"]?" visible":""}`}>
        <div className="s-header">
          <div className="s-eyebrow">01 — À propos</div>
          <h2 className="s-title">Qui suis-je ?</h2>
          <p className="s-sub">Ingénieur passionné par l'IA et le développement logiciel.</p>
        </div>
        <div className="about-grid">
          <div>
            <p className="about-p">Je suis étudiant-ingénieur en <strong>4ème année Génie Informatique</strong>, option <em>Intelligence Artificielle</em> à l'<strong>ISMAGI</strong>. Titulaire d'une <strong>Licence en Développement Web et Mobile</strong> obtenue en 2025.</p>
            <p className="about-p">J'ai développé une expérience solide à travers <em>9 projets</em> couvrant le développement full-stack, mobile, les APIs, la data science et l'IA — ainsi que <em>2 stages</em> en entreprise dont un stage PFE chez <strong>Asment Temara</strong>.</p>
            <p className="about-p">Rigoureux, autonome et passionné d'innovation, je cherche à mettre mes compétences au service de challenges techniques à fort impact.</p>
            <div className="lang-section">
              <div className="lang-title">Langues</div>
              <div className="lang-pills">
                {[["Arabe","Maternelle"],["Français","C1 — Courant"],["Anglais","B1/B2"]].map(([n,l]) => (
                  <div key={n} className="lang-pill"><span className="lang-n">{n}</span><span className="lang-l">{l}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="about-stats">
            {[["9+","Projets réalisés"],["2","Stages effectués"],["15+","Technologies"],["4ème","Année Cycle Ingénieur"]].map(([n,l]) => (
              <div key={l} className="scard"><div className="scard-n">{n}</div><div className="scard-l">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="Compétences" className={`section alt-bg${visible["Compétences"]?" visible":""}`}>
        <div className="s-header">
          <div className="s-eyebrow">02 — Compétences</div>
          <h2 className="s-title">Stack technique</h2>
          <p className="s-sub">Technologies maîtrisées à travers projets et stages.</p>
        </div>
        <div className="skills-grid">
          {SKILLS.map(sk => (
            <div key={sk.cat} className="skill-card">
              <div className="sk-icon">{sk.icon}</div>
              <div className="sk-name">{sk.cat}</div>
              <div className="sk-tags">{sk.items.map(t => <span key={t} className="sk-tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="Projets" className={`section${visible["Projets"]?" visible":""}`}>
        <div className="s-header">
          <div className="s-eyebrow">03 — Projets</div>
          <h2 className="s-title">Ce que j'ai construit</h2>
          <p className="s-sub">J'ai réalisé plusieurs projets tout au long de ma formation — voici quelques-uns qui illustrent mes compétences en web, mobile, IA et data science.</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p,i) => (
            <div key={p.title} className="pcard">
              <div className="pcard-num">Projet {String(i+1).padStart(2,"0")}</div>
              <div className="pcard-ico">{p.icon}</div>
              <div className="pcard-title">{p.title}</div>
              <div className="pcard-desc">{p.desc}</div>
              <div className="pcard-techs">{p.tech.map(t => <span key={t} className="pcard-tech">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STAGES */}
      <section id="Stages" className={`section alt-bg${visible["Stages"]?" visible":""}`}>
        <div className="s-header">
          <div className="s-eyebrow">04 — Expériences</div>
          <h2 className="s-title">Stages professionnels</h2>
          <p className="s-sub">Expériences en entreprise qui ont façonné mes compétences terrain.</p>
        </div>
        <div className="timeline">
          {STAGES.map(st => (
            <div key={st.company} className="tl-item">
              <div className="tl-dot" />
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
                <div className="stg-tags">{st.tech.map(t => <span key={t} className="stg-tag">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" className={`section${visible["Contact"]?" visible":""}`}>
        <div className="s-header">
          <div className="s-eyebrow">05 — Contact</div>
          <h2 className="s-title">Travaillons ensemble</h2>
          <p className="s-sub">Disponible pour un stage PFE, une alternance ou un poste junior en IA / Full-Stack.</p>
        </div>
        <div className="contact-grid">
          {[
            {ico:"📧",lbl:"Email",val:"anas.lahrech13@gmail.com",href:"mailto:anas.lahrech13@gmail.com"},
            {ico:"📞",lbl:"Téléphone",val:"06 02 74 77 60",href:"tel:0602747760"},
            {ico:"💼",lbl:"LinkedIn",val:"anass-lahrech",href:"https://www.linkedin.com/in/anass-lahrech-ab873b271/"},
            {ico:"🐙",lbl:"GitHub",val:"Anasslahrech",href:"https://github.com/Anasslahrech"},
          ].map(c => (
            <a key={c.lbl} href={c.href} target="_blank" rel="noreferrer" className="ccard">
              <span className="ccard-ico">{c.ico}</span>
              <span className="ccard-lbl">{c.lbl}</span>
              <span className="ccard-val">{c.val}</span>
              <span className="ccard-arr">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-l">© 2026 <strong>Anass Lahrech</strong> — Ingénieur IA & Développeur Full-Stack</div>
        <div className="footer-r">Built with <span className="gc">React</span> + <span className="gc">Vite</span> ⚡</div>
      </footer>
    </>
  )
}