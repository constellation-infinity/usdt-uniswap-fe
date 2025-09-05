import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBlockchain } from '../context/BlockchainContext'

const PortfolioSection = () => {
  const { portfolio, ethPrice, isLoading, refreshPortfolio } = useBlockchain()

  const totalBalance = (portfolio.ETH * ethPrice) + portfolio.USDT

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const balanceVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  }

  const tokenVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.5 + (i * 0.1)
      }
    })
  }

  const refreshVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 180 },
    tap: { scale: 0.9 }
  }

  return (
    <section className="portfolio-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Portfolio
      </motion.h2>
      <motion.div 
        className="portfolio-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="portfolio-header">
          <h3>Total Balance</h3>
          <motion.button 
            className="btn btn-icon" 
            onClick={refreshPortfolio} 
            disabled={isLoading}
            variants={refreshVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate={isLoading ? "hover" : "rest"}
          >
            <i className={`fas fa-sync-alt ${isLoading ? 'fa-spin' : ''}`}></i>
          </motion.button>
        </div>
        <motion.div 
          className="portfolio-balance"
          variants={balanceVariants}
          initial="hidden"
          animate="visible"
          key={totalBalance}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
        >
          ${totalBalance.toFixed(2)}
        </motion.div>
        <div className="portfolio-tokens">
          <motion.div 
            className="token-balance"
            variants={tokenVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="token-name">ETH</span>
            <motion.span 
              className="token-amount"
              key={portfolio.ETH}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.2 }}
            >
              {portfolio.ETH.toFixed(4)}
            </motion.span>
          </motion.div>
          <motion.div 
            className="token-balance"
            variants={tokenVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <span className="token-name">USDT</span>
            <motion.span 
              className="token-amount"
              key={portfolio.USDT}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.2 }}
            >
              {portfolio.USDT.toFixed(2)}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default PortfolioSection
