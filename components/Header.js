import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBlockchain } from '../context/BlockchainContext'

const Header = () => {
  const { wallet, connectWallet, disconnectWallet } = useBlockchain()

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const logoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  }

  const actionsVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4
      }
    }
  }

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
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

  const walletInfoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.header 
      className="header"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <div className="header-content">
          <motion.div 
            className="logo"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.img 
              src="/assets/1 (9).jpg" 
              alt="Avatar" 
              className="avatar-icon"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Blockchain Dashboard
            </motion.span>
          </motion.div>
          <motion.div 
            className="header-actions"
            variants={actionsVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {!wallet ? (
                <motion.button 
                  key="connect"
                  className="btn btn-primary" 
                  onClick={connectWallet}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.i 
                    className="fas fa-wallet"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  Connect Wallet
                </motion.button>
              ) : (
                <motion.div 
                  key="wallet-info"
                  className="wallet-info"
                  variants={walletInfoVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span 
                    className="wallet-address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {`${wallet.slice(0, 6)}...${wallet.slice(-4)}`}
                  </motion.span>
                  <motion.button 
                    className="btn btn-secondary" 
                    onClick={disconnectWallet}
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Disconnect
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
