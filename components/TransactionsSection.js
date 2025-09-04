import React, { useState } from 'react'
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

  return (
    <section className="transactions-section">
      <h2 className="section-title">Recent Transactions</h2>
      <div className="transactions-card">
        <div className="transactions-header">
          <div className="filter-tabs">
            <button 
              className={`tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button 
              className={`tab ${activeFilter === 'sent' ? 'active' : ''}`}
              onClick={() => handleFilterChange('sent')}
            >
              Sent
            </button>
            <button 
              className={`tab ${activeFilter === 'received' ? 'active' : ''}`}
              onClick={() => handleFilterChange('received')}
            >
              Received
            </button>
          </div>
        </div>
        <div className="transactions-list">
          {filteredTransactions.map((tx, index) => (
            <div key={tx.id} className="transaction-item">
              <div className="transaction-icon">
                <i className={`fas fa-arrow-${tx.type === 'send' ? 'up' : 'down'}`}></i>
              </div>
              <div className="transaction-details">
                <div className="transaction-type">
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                </div>
                <div className="transaction-address">{tx.address}</div>
                <div className="transaction-time">{tx.time}</div>
              </div>
              <div className={`transaction-amount ${tx.amount < 0 ? 'negative' : 'positive'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.token}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TransactionsSection
