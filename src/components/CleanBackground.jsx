import React from 'react'

const CleanBackground = () => {
  return (
    <div className="clean-bg-wrapper" aria-hidden="true">
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />
      <div className="bg-grid-overlay" />
    </div>
  )
}

export default CleanBackground
