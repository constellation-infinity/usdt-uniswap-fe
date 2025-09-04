import React from 'react'
import { useBlockchain } from '../context/BlockchainContext'

const Header = () => {
  const { wallet, connectWallet, disconnectWallet } = useBlockchain()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/assets/1 (9).jpg" alt="Avatar" className="avatar-icon" />
            <span>Blockchain Dashboard</span>
          </div>
          <div className="header-actions">
            {!wallet ? (
              <button className="btn btn-primary" onClick={connectWallet}>
                <i className="fas fa-wallet"></i>
                Connect Wallet
              </button>
            ) : (
              <div className="wallet-info">
                <span className="wallet-address">
                  {`${wallet.slice(0, 6)}...${wallet.slice(-4)}`}
                </span>
                <button className="btn btn-secondary" onClick={disconnectWallet}>
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
