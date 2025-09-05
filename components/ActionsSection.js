import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useBlockchain } from '../context/BlockchainContext'
import { useNotification } from './NotificationSystem'

const ActionsSection = () => {
  const { wallet } = useBlockchain()
  const { showError, showInfo } = useNotification()
  const [showSendModal, setShowSendModal] = useState(false)

  const handleSendTokens = () => {
    if (!wallet) {
      showError('Please connect your wallet first')
      return
    }
    setShowSendModal(true)
  }

  const handleSwapTokens = () => {
    showInfo('Swap functionality coming soon!')
  }

  const handleAddLiquidity = () => {
    showInfo('Add liquidity functionality coming soon!')
  }

  const handleViewAnalytics = () => {
    showInfo('Analytics coming soon!')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.9,
      rotate: -5,
      transition: {
        duration: 0.1
      }
    }
  }

  const textVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="actions-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Quick Actions
      </motion.h2>
      <motion.div 
        className="actions-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          className="action-card" 
          onClick={handleSendTokens}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.i 
            className="fas fa-paper-plane"
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          ></motion.i>
          <motion.span
            variants={textVariants}
            initial="rest"
            whileHover="hover"
          >
            Send Tokens
          </motion.span>
        </motion.button>
        
        <motion.button 
          className="action-card" 
          onClick={handleSwapTokens}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.i 
            className="fas fa-exchange-alt"
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          ></motion.i>
          <motion.span
            variants={textVariants}
            initial="rest"
            whileHover="hover"
          >
            Swap Tokens
          </motion.span>
        </motion.button>
        
        <motion.button 
          className="action-card" 
          onClick={handleAddLiquidity}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.i 
            className="fas fa-plus-circle"
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          ></motion.i>
          <motion.span
            variants={textVariants}
            initial="rest"
            whileHover="hover"
          >
            Add Liquidity
          </motion.span>
        </motion.button>
        
        <motion.button 
          className="action-card" 
          onClick={handleViewAnalytics}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.i 
            className="fas fa-chart-line"
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          ></motion.i>
          <motion.span
            variants={textVariants}
            initial="rest"
            whileHover="hover"
          >
            Analytics
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  )
}

export default ActionsSection
