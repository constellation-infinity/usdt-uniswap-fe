import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBlockchain } from '../context/BlockchainContext'

const TransactionsSection = () => {
  const { transactions } = useBlockchain()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredTransactions = transactions.filter(tx => {
    if (activeFilter === 'all') return true
    return tx.type === activeFilter
  })

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

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

  const tabVariants = {
    rest: { scale: 1, backgroundColor: "transparent" },
    hover: { scale: 1.05 },
    active: { scale: 1.1, backgroundColor: "#667eea" }
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    },
    hover: {
      x: 10,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5 },
    sent: { rotate: -45 },
    received: { rotate: 45 }
  }

  return (
    <section className="transactions-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Recent Transactions
      </motion.h2>
      <motion.div 
        className="transactions-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="transactions-header">
          <div className="filter-tabs">
            <motion.button 
              className={`tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
              variants={tabVariants}
              initial="rest"
              whileHover="hover"
              whileTap="active"
              animate={activeFilter === 'all' ? "active" : "rest"}
            >
              All
            </motion.button>
            <motion.button 
              className={`tab ${activeFilter === 'sent' ? 'active' : ''}`}
              onClick={() => handleFilterChange('sent')}
              variants={tabVariants}
              initial="rest"
              whileHover="hover"
              whileTap="active"
              animate={activeFilter === 'sent' ? "active" : "rest"}
            >
              Sent
            </motion.button>
            <motion.button 
              className={`tab ${activeFilter === 'received' ? 'active' : ''}`}
              onClick={() => handleFilterChange('received')}
              variants={tabVariants}
              initial="rest"
              whileHover="hover"
              whileTap="active"
              animate={activeFilter === 'received' ? "active" : "rest"}
            >
              Received
            </motion.button>
          </div>
        </div>
        <motion.div 
          className="transactions-list"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredTransactions.map((tx, index) => (
              <motion.div 
                key={tx.id} 
                className="transaction-item"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                layout
              >
                <motion.div 
                  className="transaction-icon"
                  variants={iconVariants}
                  initial="rest"
                  whileHover="hover"
                  animate={tx.type === 'send' ? "sent" : "received"}
                >
                  <i className={`fas fa-arrow-${tx.type === 'send' ? 'up' : 'down'}`}></i>
                </motion.div>
                <div className="transaction-details">
                  <motion.div 
                    className="transaction-type"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </motion.div>
                  <motion.div 
                    className="transaction-address"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {tx.address}
                  </motion.div>
                  <motion.div 
                    className="transaction-time"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {tx.time}
                  </motion.div>
                </div>
                <motion.div 
                  className={`transaction-amount ${tx.amount < 0 ? 'negative' : 'positive'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.token}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TransactionsSection
