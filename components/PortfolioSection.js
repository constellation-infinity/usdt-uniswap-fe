import React from 'react'
import { useBlockchain } from '../context/BlockchainContext'

const PortfolioSection = () => {
  const { portfolio, ethPrice, isLoading, refreshPortfolio } = useBlockchain()

  const totalBalance = (portfolio.ETH * ethPrice) + portfolio.USDT

  return (
    <section className="portfolio-section">
      <h2 className="section-title">Portfolio</h2>
      <div className="portfolio-card">
        <div className="portfolio-header">
          <h3>Total Balance</h3>
          <button className="btn btn-icon" onClick={refreshPortfolio} disabled={isLoading}>
            <i className={`fas fa-sync-alt ${isLoading ? 'fa-spin' : ''}`}></i>
          </button>
        </div>
        <div className="portfolio-balance">${totalBalance.toFixed(2)}</div>
        <div className="portfolio-tokens">
          <div className="token-balance">
            <span className="token-name">ETH</span>
            <span className="token-amount">{portfolio.ETH.toFixed(4)}</span>
          </div>
          <div className="token-balance">
            <span className="token-name">USDT</span>
            <span className="token-amount">{portfolio.USDT.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
