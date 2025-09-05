import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBlockchain } from '../context/BlockchainContext'

const SendModal = () => {
  const { sendTokens, showMessage } = useBlockchain()
  const [isOpen, setIsOpen] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('ETH')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!recipient || !amount || parseFloat(amount) <= 0) {
      showMessage('Please fill in all fields with valid values', 'error')
      return
    }

    try {
      await sendTokens(recipient, parseFloat(amount), token)
      setIsOpen(false)
      setRecipient('')
      setAmount('')
    } catch (error) {
      console.error('Error sending tokens:', error)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setRecipient('')
    setAmount('')
  }

  // This would be controlled by a global modal state in a real app
  // For now, we'll use a simple approach
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal active"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
        >
          <motion.div 
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Send Tokens
              </motion.h3>
              <motion.button 
                className="modal-close" 
                onClick={handleClose}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <i className="fas fa-times"></i>
              </motion.button>
            </div>
            <motion.form 
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="modal-body">
                <motion.div className="form-group" variants={fieldVariants}>
                  <label>Recipient Address</label>
                  <motion.input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..."
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <motion.div className="form-group" variants={fieldVariants}>
                  <label>Amount</label>
                  <motion.input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    step="0.0001"
                    min="0"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <motion.div className="form-group" variants={fieldVariants}>
                  <label>Token</label>
                  <motion.select 
                    value={token} 
                    onChange={(e) => setToken(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                  </motion.select>
                </motion.div>
              </div>
              <motion.div 
                className="modal-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleClose}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  type="submit" 
                  className="btn btn-primary"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Send
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SendModal
