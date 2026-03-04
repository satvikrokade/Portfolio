import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'

const ProjectModal = ({ project, onClose }) => {
  const [flipped, setFlipped] = useState(false)

  /* Auto-flip to back after 1.4s so user sees the animation */
  useEffect(() => {
    if (!project) return
    setFlipped(false)
    const t = setTimeout(() => setFlipped(true), 1400)
    return () => clearTimeout(t)
  }, [project])

  /* Close on ESC */
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-scene"
            initial={{ scale: 0.55, rotateY: -25, opacity: 0 }}
            animate={{ scale: 1,   rotateY: 0,   opacity: 1 }}
            exit={{ scale: 0.55, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing ring behind card */}
            <div className="modal-glow" />

            {/* Close */}
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            {/* ── 3D Flip Card ── */}
            <div
              className={`flip-card${flipped ? ' flipped' : ''}`}
              onClick={() => setFlipped((f) => !f)}
            >
              <div className="flip-card-inner">

                {/* ── FRONT ── */}
                <div className="flip-face flip-front">
                  <div className="flip-corner flip-corner--tl" />
                  <div className="flip-corner flip-corner--br" />
                  <div className="flip-scan-line" />

                  <div className="flip-icon-glow">{project.icon}</div>
                  <h2 className="flip-title">{project.title}</h2>
                  <p className="flip-category">{project.category}</p>

                  <div className="flip-pulse-ring" />
                  <p className="flip-hint">&#8635; Click to explore</p>
                </div>

                {/* ── BACK ── */}
                <div className="flip-face flip-back">
                  <div className="flip-corner flip-corner--tr" />
                  <div className="flip-corner flip-corner--bl" />

                  <h2 className="flip-title">{project.title}</h2>
                  <p className="flip-desc">{project.desc}</p>

                  <div className="flip-tech">
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>

                  <div className="flip-actions">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flip-btn-live"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Site <ExternalLink size={14} />
                    </a>
                    <a
                      href={project.githubUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="flip-btn-gh"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={14} /> Code
                    </a>
                  </div>
                </div>

              </div>
            </div>

            <p className="flip-toggle-hint">
              {flipped ? '↩ Click card to flip back' : '↻ Click card to see details'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
