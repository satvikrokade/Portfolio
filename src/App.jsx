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
  Terminal,
  Sparkles,
  Award,
  Layers,
  Send
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import CleanBackground from './components/CleanBackground'
import ProjectModal from './components/ProjectModal'
import HeroProfile from './components/HeroProfile'
import './App.css'

const EMAILJS_SERVICE_ID  = 'service_livbhly'
const EMAILJS_TEMPLATE_ID = 'template_tyu01x4'
const EMAILJS_PUBLIC_KEY  = 'GZsqJmmQ6ryq4lW3A'

const PROJECTS = [
  {
    title: "AI-Powered Doc Chatbot",
    category: "AI · Cloud",
    desc: "Intelligent assistant for government document requirements using Vertex AI and Flask. Processes natural language queries against official document schemas in real time.",
    tech: ["Python", "Flask", "MySQL", "GCP", "Vertex AI"],
    icon: <BrainCircuit size={22} />,
    liveUrl: "https://github.com/satvikrokade/CLOUDREGEX-INFOTECH-INTERNSHIP-SATVIK-ROKADE",
    githubUrl: "https://github.com/satvikrokade/CLOUDREGEX-INFOTECH-INTERNSHIP-SATVIK-ROKADE"
  },
  {
    title: "Interview Conductor",
    category: "Productivity · Backend",
    desc: "Technical interview management system with automated evaluation logic — schedules sessions, evaluates responses, and generates candidate reports.",
    tech: ["Python", "JavaScript", "MySQL"],
    icon: <Terminal size={22} />,
    liveUrl: "https://github.com/satvikrokade/Interview-Conductor-python",
    githubUrl: "https://github.com/satvikrokade/Interview-Conductor-python"
  },
  {
    title: "QueueLess App",
    category: "Mobile · Firebase",
    desc: "Smart digital queue management solution for reducing physical wait times. Users join virtual queues via mobile and receive live position updates.",
    tech: ["Android", "Java", "Firebase"],
    icon: <Smartphone size={22} />,
    liveUrl: "https://github.com/satvikrokade",
    githubUrl: "https://github.com/satvikrokade"
  },
  {
    title: "Binance Trading Bot",
    category: "Finance · Automation",
    desc: "Automated crypto trading bot with real-time market data analysis. Executes BUY/SELL orders based on configurable technical indicators and risk rules.",
    tech: ["Python", "Binance API", "REST"],
    icon: <Database size={22} />,
    liveUrl: "https://github.com/satvikrokade/Binance_bot",
    githubUrl: "https://github.com/satvikrokade/Binance_bot"
  },
  {
    title: "GenAI Model",
    category: "AI · Generative",
    desc: "Generative AI model implementation exploring LLM integrations and AI-driven content generation pipelines built with JavaScript.",
    tech: ["JavaScript", "GenAI", "LLM"],
    icon: <Cpu size={22} />,
    liveUrl: "https://github.com/satvikrokade/GenAI-model",
    githubUrl: "https://github.com/satvikrokade/GenAI-model"
  },
  {
    title: "PPD Solar Website",
    category: "Web · Client Project",
    desc: "Professional business website for PPD Solar Private Limited. A responsive multi-page HTML/CSS website showcasing solar products and services.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: <Code2 size={22} />,
    liveUrl: "https://github.com/satvikrokade/PPD-SOLAR-PVT-LTD",
    githubUrl: "https://github.com/satvikrokade/PPD-SOLAR-PVT-LTD"
  },
  {
    title: "Smart Complaint System",
    category: "Full Stack · Cloudflare",
    desc: "End-to-end complaint management platform with a Python backend and JavaScript frontend. Supports complaint submission, tracking, and resolution workflows — deployed on Cloudflare.",
    tech: ["JavaScript", "Python", "HTML", "CSS", "Cloudflare"],
    icon: <Server size={22} />,
    liveUrl: "https://github.com/satvikrokade/SMART-COMPLAINT-MANAGEMENT-SYSTEM",
    githubUrl: "https://github.com/satvikrokade/SMART-COMPLAINT-MANAGEMENT-SYSTEM"
  },
]

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [formData, setFormData]   = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | success | error
  const { scrollYProgress } = useScroll()

  // Custom interactive cursor glow coordinates
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 })
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      console.error('EmailJS error:', err)
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
      {/* Scroll indicator */}
      <motion.div className="progress-bar" style={{ scaleX }} />
      
      {/* High-performance CSS background */}
      <CleanBackground />
      
      {/* Interactive mouse trailing glow */}
      <div 
        className="mouse-glow" 
        style={{ 
          position: 'fixed',
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          width: '360px',
          height: '360px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(50px)'
        }} 
      />

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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <span className="hero-tag">Welcome to my portfolio</span>
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Satvik Rokade</span>
            </h1>
            <h2 className="hero-subtitle">Engineering high-performance backend architectures & AI solutions.</h2>
            <p className="hero-desc">
              3rd Year Computer Engineering Student passionate about building scalable
              cloud-native systems, automation microservices, and agentic AI integrations.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">
                View My Work <ChevronRight size={18} />
              </a>
              <a href="/Satvik_Rokade_Resume.pdf" download="Satvik_Rokade_Resume.pdf" className="btn-secondary">
                Get Resume <ExternalLink size={16} />
              </a>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/satvik-rokade-321b36345/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/satvikrokade" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="mailto:satvik.12312@gmail.com" aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-image"
          >
            <HeroProfile />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="section-header">
            <span className="badge"><Sparkles size={12} /> Summary</span>
            <h2>Deep Dive into My Expertise</h2>
          </div>
          <div className="about-grid">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card about-card"
            >
              <p>
                As a Computer Engineering student at Vidya Pratishthan’s College of Engineering (9.2/10 CGPA),
                I specialize in engineering resilient backend architectures and intelligent, AI-driven solutions.
              </p>
              <p>
                With a product-first mindset, I thrive on tackling complex engineering challenges—from designing 
                high-throughput REST/GraphQL APIs and automated data pipelines to orchestrating robust Google Cloud 
                solutions. I enjoy connecting advanced large language models with production systems to automate
                tedious workflows and maximize operational efficiency.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="stats-grid"
            >
              <div className="stat-item">
                <h3 className="gradient-text">9.2</h3>
                <span>CGPA Score</span>
              </div>
              <div className="stat-item">
                <h3 className="gradient-text">5+</h3>
                <span>Workshops Led</span>
              </div>
              <div className="stat-item">
                <h3 className="gradient-text">900+</h3>
                <span>Duolingo Streak</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section">
          <div className="section-header">
            <span className="badge"><Award size={12} /> Timeline</span>
            <h2>Professional Experience</h2>
          </div>
          <div className="timeline">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>
              <div className="glass-card">
                <span className="date">09/2025 - Present</span>
                <h3>Tech Core Member</h3>
                <h4>Google Developer Groups – India</h4>
                <ul>
                  <li>Led and coordinated 5+ technical workshops for 200+ developers on cloud infrastructure.</li>
                  <li>Worked with Google Cloud tools, including Vertex AI, Firebase, and Cloud Functions.</li>
                  <li>Improved community engagement metrics by 30% through interactive technical bootcamps.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>
              <div className="glass-card">
                <span className="date">02/2026 - Present</span>
                <h3>Junior Development Intern</h3>
                <h4>Cloud Regex Private Limited</h4>
                <ul>
                  <li>Supporting development tasks and core backend REST API integrations.</li>
                  <li>Involved in optimizing server responses and designing relational schemas.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>
              <div className="glass-card">
                <span className="date">01/2025 - 02/2025</span>
                <h3>Technical Specialist (Intern)</h3>
                <h4>E-Cell, VPKBIET</h4>
                <ul>
                  <li>Automated startup program workflows, reducing coordinator processing times by 50%.</li>
                  <li>Maintained event hosting platforms and portals supporting over 200 active student entrepreneurs.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="section-header">
            <span className="badge"><Layers size={12} /> Showcase</span>
            <h2>Featured Projects</h2>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card project-card"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="project-icon">{proj.icon}</div>
                <h3>{proj.title}</h3>
                <p className="proj-category">{proj.category}</p>
                <p>{proj.desc.slice(0, 95)}…</p>
                <div className="project-tech">
                  {proj.tech.slice(0, 3).map(t => <span key={t}>{t}</span>)}
                  {proj.tech.length > 3 && <span>+{proj.tech.length - 3}</span>}
                </div>
                <span className="project-link">
                  Open Project <ExternalLink size={14} />
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <div className="section-header">
            <span className="badge"><Sparkles size={12} /> Acumen</span>
            <h2>Technical Skillset</h2>
          </div>
          <div className="skills-grid">
            <motion.div 
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            <motion.div 
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
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
            </motion.div>

            <motion.div 
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Smartphone className="skill-icon" />
              <h3>Mobile Dev</h3>
              <div className="skill-tags">
                <span>Flutter</span>
                <span>Android (Java)</span>
                <span>React Native</span>
                <span>Firebase</span>
                <span>Dart</span>
              </div>
            </motion.div>

            <motion.div 
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <BrainCircuit className="skill-icon" />
              <h3>Frontend</h3>
              <div className="skill-tags">
                <span>React.js</span>
                <span>Vite</span>
                <span>HTML5</span>
                <span>CSS3</span>
                <span>Tailwind CSS</span>
                <span>Framer Motion</span>
              </div>
            </motion.div>

            <motion.div 
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>

            <motion.div 
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
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
            </motion.div>

            <motion.div 
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
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
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="glass-card contact-container">
            <div className="contact-info">
              <h2>Let's Build Something <span className="gradient-text">Exceptional</span> Together</h2>
              <p>Ready to collaborate on innovative cloud systems, APIs, or smart AI integrations? Drop a message!</p>
              <div className="contact-details">
                <div className="contact-item">
                  <Mail size={20} />
                  <span>satvik.12312@gmail.com</span>
                </div>
                <div className="contact-item">
                  <Linkedin size={20} />
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
                {formStatus === 'sending' ? 'Sending…' : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Send Message <Send size={15} /></span>}
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
        <p>© 2026 Satvik Rokade. Built with modern React & Framer Motion.</p>
      </footer>
    </div>
  )
}

export default App
