import React, { useState } from 'react'
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

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Send Tokens</h3>
          <button className="modal-close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Recipient Address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.0001"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Token</label>
              <select value={token} onChange={(e) => setToken(e.target.value)}>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SendModal
