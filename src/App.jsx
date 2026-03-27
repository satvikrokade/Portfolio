import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Server,
  Cloud,
  Smartphone,
  ChevronRight,
  Database,
  Cpu,
  BrainCircuit,
  Terminal
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import Background3D from './components/Background3D'
import ProjectModal from './components/ProjectModal'
import './App.css'

// ── EmailJS config ─────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service  →  copy the Service ID below
// 3. Create an Email Template (use variables: {{from_name}}, {{from_email}}, {{message}})
//    Copy the Template ID below
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_SERVICE_ID  = 'service_livbhly'
const EMAILJS_TEMPLATE_ID = 'template_tyu01x4'
const EMAILJS_PUBLIC_KEY  = 'GZsqJmmQ6ryq4lW3A'

const PROJECTS = [
  {
    title: "AI-Powered Doc Chatbot",
    category: "AI · Cloud",
    desc: "Intelligent assistant for government document requirements using Vertex AI and Flask. Processes natural language queries against official document schemas in real time.",
    tech: ["Python", "Flask", "MySQL", "GCP", "Vertex AI"],
    icon: <BrainCircuit />,
    liveUrl: "https://your-chatbot-demo.com",
    githubUrl: "https://github.com/satvikrokade/CLOUDREGEX-INFOTECH-INTERNSHIP-SATVIK-ROKADE"
  },
  {
    title: "Interview Conductor",
    category: "Productivity · Backend",
    desc: "Technical interview management system with automated evaluation logic — schedules sessions, evaluates responses, and generates candidate reports.",
    tech: ["Python", "JavaScript", "MySQL"],
    icon: <Terminal />,
    liveUrl: "https://your-interview-app.com",
    githubUrl: "https://github.com/satvikrokade/Interview-Conductor-python"
  },
  {
    title: "QueueLess App",
    category: "Mobile · Firebase",
    desc: "Smart digital queue management solution for reducing physical wait times. Users join virtual queues via mobile and receive live position updates.",
    tech: ["Android", "Java", "Firebase"],
    icon: <Smartphone />,
    liveUrl: "https://your-queueless-app.com",
    githubUrl: "https://github.com/satvikrokade"
  },
  {
    title: "Binance Trading Bot",
    category: "Finance · Automation",
    desc: "Automated crypto trading bot with real-time market data analysis. Executes BUY/SELL orders based on configurable technical indicators and risk rules.",
    tech: ["Python", "Binance API", "REST"],
    icon: <Database />,
    liveUrl: "https://your-trading-bot.com",
    githubUrl: "https://github.com/satvikrokade/Binance_bot"
  },
  {
    title: "GenAI Model",
    category: "AI · Generative",
    desc: "Generative AI model implementation exploring LLM integrations and AI-driven content generation pipelines built with JavaScript.",
    tech: ["JavaScript", "GenAI", "LLM"],
    icon: <Cpu />,
    liveUrl: "https://your-genai-demo.com",
    githubUrl: "https://github.com/satvikrokade/GenAI-model"
  },
  {
    title: "PPD Solar Pvt. Ltd. Website",
    category: "Web · Client Project",
    desc: "Professional business website for PPD Solar Private Limited. A responsive multi-page HTML/CSS website showcasing solar products and services.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: <Code2 />,
    liveUrl: "https://your-ppd-solar-demo.com",
    githubUrl: "https://github.com/satvikrokade/PPD-SOLAR-PVT-LTD"
  },
  {
    title: "Smart Complaint Management System",
    category: "Full Stack · Cloudflare",
    desc: "End-to-end complaint management platform with a Python backend and JavaScript frontend. Supports complaint submission, tracking, and resolution workflows — deployed on Cloudflare.",
    tech: ["JavaScript", "Python", "HTML", "CSS", "Cloudflare"],
    icon: <Server />,
    liveUrl: "https://your-complaint-system-demo.com",
    githubUrl: "https://github.com/satvikrokade/SMART-COMPLAINT-MANAGEMENT-SYSTEM"
  },
]

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [formData, setFormData]   = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | success | error
  const { scrollYProgress } = useScroll()

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setFormStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error status:', err?.status)
      console.error('EmailJS error text:', err?.text)
      console.error('EmailJS full error:', JSON.stringify(err))
      setFormStatus('error')
    }
  }
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="portfolio-container">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Background3D />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-logo">SR<span>.</span></div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact" className="nav-btn">Connect</a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-image"
          >
            <div className="image-border">
              <img src="/profile.png" alt="Satvik Rokade" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-content"
          >
            <span className="hero-tag">Welcome to my digital space</span>
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Satvik Rokade</span>
            </h1>
            <h2 className="hero-subtitle">Engineering the future of Scalable Backend Systems & AI</h2>
            <p className="hero-desc">
              3rd Year Computer Engineering Student passionate about building high-performance
              cloud-native applications and AI-driven solutions.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">View My Work <ChevronRight size={18} /></a>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/satvik-rokade-321b36345/" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
                <a href="https://github.com/satvikrokade" target="_blank" rel="noreferrer"><Github size={20} /></a>
                <a href="mailto:satvik.12312@gmail.com"><Mail size={20} /></a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="section-header">
            <span className="badge">Summary</span>
            <h2>Deep Dive into My Expertise</h2>
          </div>
          <div className="about-grid">
            <div className="glass-card about-card">
              <p>
                As a Computer Engineering student at Vidya Pratishthan’s College of Engineering (9.2/10 CGPA),
                I specialize in engineering resilient backend architectures and intelligent, AI-driven solutions.
                With a product-first mindset, I thrive on tackling real-world challenges—from designing scalable
                systems that seamlessly handle high-throughput traffic to integrating advanced AI models that drive
                automation and business innovation.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <h3 className="gradient-text">9.2</h3>
                <span>CGPA score</span>
              </div>
              <div className="stat-item">
                <h3 className="gradient-text">5+</h3>
                <span>Workshops Led</span>
              </div>
              <div className="stat-item">
                <h3 className="gradient-text">900+</h3>
                <span>Duolingo Streak</span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section">
          <div className="section-header">
            <span className="badge">Timeline</span>
            <h2>Professional Experience</h2>
          </div>
          <div className="timeline">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>
              <div className="glass-card">
                <span className="date">09/2025 - Present</span>
                <h3>Tech Core Member</h3>
                <h4>Google Developer Groups – India</h4>
                <ul>
                  <li>Led and coordinated 5+ technical workshops for 200+ developers.</li>
                  <li>Worked with Google Cloud tools, including Vertex AI and Cloud Functions.</li>
                  <li>Improved community engagement by 30%.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>
              <div className="glass-card">
                <span className="date">02/2026 - Present</span>
                <h3>Junior Development Intern</h3>
                <h4>Cloud Regex Private Limited</h4>
                <ul>
                  <li>Ongoing internship as a Junior Developer starting from February 15.</li>
                  <li>Involved in development tasks and core implementations.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 20 }}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>
              <div className="glass-card">
                <span className="date">01/2025 - 02/2025</span>
                <h3>Technical Specialist (Intern)</h3>
                <h4>E-Cell, VPKBIET</h4>
                <ul>
                  <li>Automated workflows, reducing processing time by 50%.</li>
                  <li>Maintained platforms with 200+ active users.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="section-header">
            <span className="badge">Showcase</span>
            <h2>Featured Projects</h2>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="glass-card project-card"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="project-icon">{proj.icon}</div>
                <h3>{proj.title}</h3>
                <p className="proj-category">{proj.category}</p>
                <p>{proj.desc.slice(0, 90)}…</p>
                <div className="project-tech">
                  {proj.tech.slice(0, 3).map(t => <span key={t}>{t}</span>)}
                  {proj.tech.length > 3 && <span>+{proj.tech.length - 3}</span>}
                </div>
                <span className="project-link">Open Project <ExternalLink size={14} /></span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <div className="section-header">
            <span className="badge">Acumen</span>
            <h2>Technical Skillset</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-category glass-card">
              <Code2 className="skill-icon" />
              <h3>Languages</h3>
              <div className="skill-tags">
                <span>Python</span>
                <span>Java</span>
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>C++</span>
                <span>Dart</span>
                <span>SQL</span>
              </div>
            </div>
            <div className="skill-category glass-card">
              <Server className="skill-icon" />
              <h3>Backend</h3>
              <div className="skill-tags">
                <span>Django</span>
                <span>Flask</span>
                <span>Node.js</span>
                <span>Express.js</span>
                <span>REST APIs</span>
                <span>GraphQL</span>
                <span>WebSockets</span>
              </div>
            </div>
            <div className="skill-category glass-card">
              <Smartphone className="skill-icon" />
              <h3>App Development</h3>
              <div className="skill-tags">
                <span>Flutter</span>
                <span>Android (Java)</span>
                <span>React Native</span>
                <span>Firebase</span>
                <span>Dart</span>
              </div>
            </div>
            <div className="skill-category glass-card">
              <BrainCircuit className="skill-icon" />
              <h3>Frontend</h3>
              <div className="skill-tags">
                <span>React.js</span>
                <span>Vite</span>
                <span>HTML5</span>
                <span>CSS3</span>
                <span>Tailwind CSS</span>
                <span>Framer Motion</span>
                <span>Three.js</span>
              </div>
            </div>
            <div className="skill-category glass-card">
              <Database className="skill-icon" />
              <h3>Database</h3>
              <div className="skill-tags">
                <span>MySQL</span>
                <span>MongoDB</span>
                <span>PostgreSQL</span>
                <span>Firebase</span>
                <span>Redis</span>
                <span>Firestore</span>
              </div>
            </div>
            <div className="skill-category glass-card">
              <Cloud className="skill-icon" />
              <h3>Cloud & DevOps</h3>
              <div className="skill-tags">
                <span>Google Cloud (GCP)</span>
                <span>Cloudflare</span>
                <span>Docker</span>
                <span>Git & GitHub</span>
                <span>CI/CD</span>
                <span>Linux</span>
              </div>
            </div>
            <div className="skill-category glass-card">
              <Cpu className="skill-icon" />
              <h3>AI & ML</h3>
              <div className="skill-tags">
                <span>Vertex AI</span>
                <span>TensorFlow</span>
                <span>Gemini API</span>
                <span>LangChain</span>
                <span>OpenAI API</span>
                <span>Scikit-learn</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="glass-card contact-container">
            <div className="contact-info">
              <h2>Let's Build Something <span className="gradient-text">Exceptional</span> Together</h2>
              <p>Ready to collaborate on innovative projects or explore new opportunities?</p>
              <div className="contact-details">
                <div className="contact-item">
                  <Mail className="primary" />
                  <span>satvik.12312@gmail.com</span>
                </div>
                <div className="contact-item">
                  <Linkedin className="primary" />
                  <span>linkedin.com/in/satvik-rokade</span>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleFormChange}
                required
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={formStatus === 'sending'}
                style={{ opacity: formStatus === 'sending' ? 0.7 : 1 }}
              >
                {formStatus === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              {formStatus === 'success' && (
                <p className="form-success">✓ Message sent! I'll get back to you soon.</p>
              )}
              {formStatus === 'error' && (
                <p className="form-error">✗ Something went wrong. Please try again or email directly.</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Satvik Rokade. Built with React, Three.js & Passion.</p>
      </footer>
    </div>
  )
}

export default App
