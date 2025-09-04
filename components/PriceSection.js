import React from 'react'
import { useBlockchain } from '../context/BlockchainContext'

const PriceSection = () => {
  const { ethPrice } = useBlockchain()

  return (
    <section className="price-section">
      <h2 className="section-title">Market Prices</h2>
      <div className="price-grid">
        <div className="price-card">
          <div className="price-header">
            <div className="token-info">
              <img src="/assets/Ethereum.png" alt="ETH" className="token-icon" />
              <div className="token-details">
                <h3>Ethereum</h3>
                <span className="token-symbol">ETH</span>
              </div>
            </div>
            <div className="price-change positive">
              <i className="fas fa-arrow-up"></i>
              +2.34%
            </div>
          </div>
          <div className="price-value">${ethPrice.toFixed(2)}</div>
          <div className="price-source">Source: Uniswap V3</div>
        </div>

        <div className="price-card">
          <div className="price-header">
            <div className="token-info">
              <img src="/assets/Tether.jpg" alt="USDT" className="token-icon" />
              <div className="token-details">
                <h3>Tether</h3>
                <span className="token-symbol">USDT</span>
              </div>
            </div>
            <div className="price-change neutral">
              <i className="fas fa-minus"></i>
              0.00%
            </div>
          </div>
          <div className="price-value">$1.00</div>
          <div className="price-source">Stablecoin</div>
        </div>
      </div>
    </section>
  )
}

export default PriceSection
