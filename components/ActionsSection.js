import React, { useState } from 'react'
import { useBlockchain } from '../context/BlockchainContext'

const ActionsSection = () => {
  const { wallet, showMessage } = useBlockchain()
  const [showSendModal, setShowSendModal] = useState(false)

  const handleSendTokens = () => {
    if (!wallet) {
      showMessage('Please connect your wallet first', 'error')
      return
    }
    setShowSendModal(true)
  }

  const handleSwapTokens = () => {
    showMessage('Swap functionality coming soon!', 'info')
  }

  const handleAddLiquidity = () => {
    showMessage('Add liquidity functionality coming soon!', 'info')
  }

  const handleViewAnalytics = () => {
    showMessage('Analytics coming soon!', 'info')
  }

  return (
    <section className="actions-section">
      <h2 className="section-title">Quick Actions</h2>
      <div className="actions-grid">
        <button className="action-card" onClick={handleSendTokens}>
          <i className="fas fa-paper-plane"></i>
          <span>Send Tokens</span>
        </button>
        <button className="action-card" onClick={handleSwapTokens}>
          <i className="fas fa-exchange-alt"></i>
          <span>Swap Tokens</span>
        </button>
        <button className="action-card" onClick={handleAddLiquidity}>
          <i className="fas fa-plus-circle"></i>
          <span>Add Liquidity</span>
        </button>
        <button className="action-card" onClick={handleViewAnalytics}>
          <i className="fas fa-chart-line"></i>
          <span>Analytics</span>
        </button>
      </div>
    </section>
  )
}

export default ActionsSection
