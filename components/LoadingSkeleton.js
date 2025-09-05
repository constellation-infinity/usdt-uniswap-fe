import React from 'react'
import { motion } from 'framer-motion'

const LoadingSkeleton = ({ type = 'card', lines = 3, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  if (type === 'card') {
    return (
      <motion.div 
        className={`skeleton ${className}`}
        style={{ padding: '1.5rem', borderRadius: '16px', height: '200px' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="skeleton-circle skeleton" 
          style={{ marginBottom: '1rem' }}
          variants={itemVariants}
        />
        <motion.div 
          className="skeleton-text skeleton long" 
          style={{ marginBottom: '0.5rem' }}
          variants={itemVariants}
        />
        <motion.div 
          className="skeleton-text skeleton medium" 
          style={{ marginBottom: '0.5rem' }}
          variants={itemVariants}
        />
        <motion.div 
          className="skeleton-text skeleton short" 
          variants={itemVariants}
        />
      </motion.div>
    )
  }

  if (type === 'list') {
    return (
      <motion.div 
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div 
            key={index}
            className="skeleton skeleton-text long" 
            style={{ marginBottom: '0.75rem', height: '60px', borderRadius: '8px' }}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    )
  }

  if (type === 'price') {
    return (
      <motion.div 
        className={`skeleton ${className}`}
        style={{ padding: '1.5rem', borderRadius: '16px', height: '150px' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="skeleton skeleton-text short" 
          style={{ marginBottom: '1rem', height: '1.5rem' }}
          variants={itemVariants}
        />
        <motion.div 
          className="skeleton skeleton-text long" 
          style={{ marginBottom: '0.5rem', height: '2rem' }}
          variants={itemVariants}
        />
        <motion.div 
          className="skeleton skeleton-text medium" 
          variants={itemVariants}
        />
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={`skeleton skeleton-text long ${className}`}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    />
  )
}

export default LoadingSkeleton
