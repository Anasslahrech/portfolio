export const NAV = ["Accueil", "À propos", "Compétences", "Projets", "Stages", "Contact"]

export const TITLES = ["Ingénieur IA", "Développeur Full-Stack", "Data Scientist", "Mobile Developer"]

export const SKILLS = [
  { icon:"🤖", cat:"IA / Machine Learning", items:["Python","TensorFlow","Keras","PyTorch","Scikit-learn","NLP","CNN","Deep Learning"] },
  { icon:"🎨", cat:"Web Frontend", items:["React.js","Vue.js","HTML5","CSS3","Bootstrap","JavaScript","TypeScript"] },
  { icon:"⚙️", cat:"Web Backend", items:["Laravel","Django","Node.js","Express","Spring Boot","PHP","REST API","SOAP","RMI"] },
  { icon:"📱", cat:"Mobile", items:["Android Java","Flutter","Dart"] },
  { icon:"🗄️", cat:"Bases de données", items:["MySQL","MongoDB","PostgreSQL","Firebase","SQLite"] },
  { icon:"🛠️", cat:"DevOps & Outils", items:["Git","GitHub","Docker","Postman","Linux","VS Code"] },
  { icon:"📊", cat:"Data Science", items:["Pandas","NumPy","Matplotlib","Seaborn","Jupyter Notebook"] },
  { icon:"💼", cat:"Bureautique & Design", items:["Word","Excel","PowerPoint","Canva"] },
]

export const PROJECTS = [
  { icon:"📝", title:"Gestion des Examens", tech:["Java","JSP/Servlet","MySQL"], tags:["Web","Java"], desc:"Plateforme CRUD complète pour la gestion des étudiants, questions et examens universitaires.", video:"" },
  { icon:"💪", title:"App Fitness & Nutrition", tech:["Android Java","SQLite","XML"], tags:["Mobile"], desc:"App mobile Android avec calcul de calories et programmes personnalisés selon l'objectif de chaque utilisateur.", video:"/videos/FITTRACK.mp4" },
  { icon:"🏛️", title:"Réservation Salles & Amphi", tech:["Java","REST API","SOAP","RMI","MySQL"], tags:["Web","Java"], desc:"Système de réservation multi-protocoles pour amphithéâtres et salles.", video:"" },
  { icon:"🛒", title:"E-commerce Sportif", tech:["Django","Python","MySQL","Bootstrap"], tags:["Web","Python"], desc:"Plateforme e-commerce complète pour produits sportifs avec gestion du catalogue et des commandes.", video:"" },
  { icon:"💼", title:"Site d'Offres d'Emploi", tech:["Laravel","PHP","MySQL","Bootstrap"], tags:["Web","PHP"], desc:"Portail emploi avec espaces distincts Candidat / Recruteur, candidatures et gestion des offres.", video:"" },
  { icon:"🗺️", title:"Suivi Livraisons Temps Réel", tech:["Node.js","Express","MongoDB","Socket.IO","Google Maps"], tags:["Web","Node.js"], desc:"Système de tracking temps réel avec carte interactive et mise à jour de position.", video:"" },
  { icon:"📋", title:"Gestionnaire de Contacts", tech:["Vue.js","Vue Router","Bootstrap","json-server"], tags:["Web","Vue.js"], desc:"Application CRUD de gestion de contacts avec navigation fluide et API simulée.", video:"" },
  { icon:"📣", title:"Site Vitrine Marketing Digital", tech:["React.js","CSS3","Bootstrap"], tags:["Web","React"], desc:"Site vitrine professionnel pour agence de marketing digital, responsive et moderne.", video:"/videos/MarketingDigital.mp4" },
  { icon:"🖥️", title:"Gestion Matériel IT", tech:["Laravel","PHP","MySQL","Bootstrap"], tags:["Web","PHP"], desc:"Système de gestion du parc informatique d'Asment Temara — suivi et affectation des équipements IT.", video:"" },
]

export const PROJECT_FILTERS = ["Tous", "Web", "Mobile", "Python", "Java", "PHP", "React", "Vue.js", "Node.js"]

export const STAGES = [
  { icon:"🏭", company:"Asment Temara", role:"Développeur Web — Stage PFE", period:"Juil — Août 2024 · 2 mois", loc:"Ain Atiq, Maroc", desc:"Développement d'une application web de gestion du parc matériel IT. CRUD complet, gestion des utilisateurs et tableau de bord de suivi des équipements.", tech:["Laravel","PHP","MySQL","Bootstrap"] },
  { icon:"🏛️", company:"Direction des Systèmes d'Information", role:"Stagiaire — Découverte Professionnelle", period:"2022 · 1 mois", loc:"Rabat Souissi, Maroc", desc:"Découverte d'une DSI publique, suivi du parc informatique, initiation aux infrastructures réseau et aux processus de gestion des systèmes d'information.", tech:["Systèmes d'information","Réseau","Parc IT"] },
]

export const STATS = [
  { num: 9, suffix: "+", label: "Projets réalisés" },
  { num: 2, suffix: "", label: "Stages effectués" },
  { num: 15, suffix: "+", label: "Technologies" },
  { num: 4, suffix: "ème", label: "Année Ingénieur" },
]

export const CONTACT_LINKS = [
  { ico:"📧", lbl:"Email",    val:"anas.lahrech13@gmail.com",           href:"mailto:anas.lahrech13@gmail.com" },
  { ico:"📞", lbl:"Téléphone",val:"06 02 74 77 60",                    href:"tel:0602747760" },
  { ico:"💼", lbl:"LinkedIn", val:"anass-lahrech",                     href:"https://www.linkedin.com/in/anass-lahrech-ab873b271/" },
  { ico:"🐙", lbl:"GitHub",   val:"Anasslahrech",                      href:"https://github.com/Anasslahrech" },
]