import React from 'react'
import { motion } from 'framer-motion'
import { useBlockchain } from '../context/BlockchainContext'

const PriceSection = () => {
  const { ethPrice } = useBlockchain()

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const priceVariants = {
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

  const changeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.5
      }
    }
  }

  return (
    <section className="price-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Market Prices
      </motion.h2>
      <div className="price-grid">
        <motion.div 
          className="price-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <div className="price-header">
            <div className="token-info">
              <motion.img 
                src="/assets/Ethereum.png" 
                alt="ETH" 
                className="token-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
              <div className="token-details">
                <h3>Ethereum</h3>
                <span className="token-symbol">ETH</span>
              </div>
            </div>
            <motion.div 
              className="price-change positive"
              variants={changeVariants}
              initial="hidden"
              animate="visible"
            >
              <i className="fas fa-arrow-up"></i>
              +2.34%
            </motion.div>
          </div>
          <motion.div 
            className="price-value"
            variants={priceVariants}
            initial="hidden"
            animate="visible"
            key={ethPrice}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            ${ethPrice.toFixed(2)}
          </motion.div>
          <div className="price-source">Source: Uniswap V3</div>
        </motion.div>

        <motion.div 
          className="price-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <div className="price-header">
            <div className="token-info">
              <motion.img 
                src="/assets/Tether.jpg" 
                alt="USDT" 
                className="token-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
              <div className="token-details">
                <h3>Tether</h3>
                <span className="token-symbol">USDT</span>
              </div>
            </div>
            <motion.div 
              className="price-change neutral"
              variants={changeVariants}
              initial="hidden"
              animate="visible"
            >
              <i className="fas fa-minus"></i>
              0.00%
            </motion.div>
          </div>
          <motion.div 
            className="price-value"
            variants={priceVariants}
            initial="hidden"
            animate="visible"
          >
            $1.00
          </motion.div>
          <div className="price-source">Stablecoin</div>
        </motion.div>
      </div>
    </section>
  )
}

export default PriceSection
