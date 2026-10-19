import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Terminal, Cpu, Cloud } from 'lucide-react'
import profileImg from '../assets/profile.png'

const HeroProfile = () => {
  return (
    <div className="hero-avatar-wrapper">
      {/* Ambient background glow behind avatar */}
      <div className="avatar-ambient-glow" />

      {/* Main Avatar Container */}
      <motion.div
        className="avatar-card-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="avatar-image-ring">
          <img
            src={profileImg}
            alt="Satvik Rokade"
            className="avatar-image"
            loading="eager"
          />
        </div>

        {/* Status indicator badge */}
        <motion.div
          className="avatar-status-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="status-ping" />
          <span className="status-dot" />
          <span>Available for opportunities</span>
        </motion.div>
      </motion.div>

      {/* Floating Pill Badges */}
      <motion.div
        className="floating-badge badge-top-left"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="badge-icon"><Cpu size={14} /></div>
        <span>AI & LLM Systems</span>
      </motion.div>

      <motion.div
        className="floating-badge badge-bottom-right"
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="badge-icon"><Cloud size={14} /></div>
        <span>GCP Cloud Native</span>
      </motion.div>

      <motion.div
        className="floating-badge badge-bottom-left"
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="badge-icon"><Terminal size={14} /></div>
        <span>High-Performance Backend</span>
      </motion.div>
    </div>
  )
}

export default HeroProfile
