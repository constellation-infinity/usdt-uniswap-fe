import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const BlockchainContext = createContext(undefined)

export const useBlockchain = () => {
  const context = useContext(BlockchainContext)
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider')
  }
  return context
}

export const BlockchainProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null)
  const [ethPrice, setEthPrice] = useState(0)
  const [portfolio, setPortfolio] = useState({ ETH: 0, USDT: 0 })
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load ETH price
  const loadETHPrice = async () => {
    try {
      const response = await axios.get('/api/eth-price')
      if (response.data.success) {
        setEthPrice(response.data.price)
      }
    } catch (error) {
      console.error('Error loading ETH price:', error)
      setEthPrice(4454.23) // Fallback price
    }
  }

  // Load portfolio data
  const loadPortfolio = async () => {
    if (!wallet) return

    try {
      const response = await axios.get(`/api/portfolio/${wallet}`)
      if (response.data.success) {
        setPortfolio(response.data.portfolio)
      }
    } catch (error) {
      console.error('Error loading portfolio:', error)
      // Fallback to mock data
      setPortfolio({ ETH: 1.8, USDT: 500 })
    }
  }

  // Load transactions
  const loadTransactions = async () => {
    if (!wallet) return

    try {
      const response = await axios.get(`/api/transactions/${wallet}`)
      if (response.data.success) {
        setTransactions(response.data.transactions)
      }
    } catch (error) {
      console.error('Error loading transactions:', error)
      // Fallback to mock data
      setTransactions([
        {
          id: 1,
          type: 'send',
          address: '0x1234...5678',
          amount: -0.5,
          token: 'ETH',
          time: '2 hours ago',
          hash: '0xabc123...'
        },
        {
          id: 2,
          type: 'receive',
          address: '0x8765...4321',
          amount: 1.2,
          token: 'ETH',
          time: '1 day ago',
          hash: '0xdef456...'
        }
      ])
    }
  }

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })

        if (accounts.length > 0) {
          setWallet(accounts[0])
          await loadPortfolio()
          await loadTransactions()
          showMessage('Wallet connected successfully!', 'success')
        }
      } else {
        showMessage('MetaMask is not installed. Please install MetaMask to connect your wallet.', 'error')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      showMessage('Failed to connect wallet', 'error')
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet(null)
    setPortfolio({ ETH: 0, USDT: 0 })
    setTransactions([])
    showMessage('Wallet disconnected', 'info')
  }

  // Refresh portfolio
  const refreshPortfolio = async () => {
    setIsLoading(true)
    try {
      await loadPortfolio()
      showMessage('Portfolio refreshed', 'success')
    } catch (error) {
      showMessage('Failed to refresh portfolio', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Send tokens
  const sendTokens = async (recipient, amount, token) => {
    if (!wallet) {
      showMessage('Please connect your wallet first', 'error')
      return
    }

    if (amount > portfolio[token]) {
      showMessage(`Insufficient ${token} balance`, 'error')
      return
    }

    try {
      // In a real implementation, you would send a transaction
      showMessage('Transaction sent!', 'success')
      
      // Update portfolio
      setPortfolio(prev => ({
        ...prev,
        [token]: prev[token] - amount
      }))
      
      // Add to transaction history
      const newTransaction = {
        id: Date.now(),
        type: 'send',
        address: recipient,
        amount: -amount,
        token: token,
        time: 'Just now',
        hash: '0x' + Math.random().toString(16).substr(2, 8) + '...'
      }
      
      setTransactions(prev => [newTransaction, ...prev])
      
    } catch (error) {
      console.error('Error sending tokens:', error)
      showMessage('Failed to send tokens', 'error')
    }
  }

  // Filter transactions
  const filterTransactions = (filter) => {
    // This would be handled in the TransactionsSection component
    // For now, we'll just log it
    console.log('Filtering transactions by:', filter)
  }

  // Show message
  const showMessage = (message, type) => {
    // This would be handled by a toast notification system
    console.log(`${type.toUpperCase()}: ${message}`)
  }

  // Initialize
  useEffect(() => {
    loadETHPrice()
    
    // Update price every 30 seconds
    const interval = setInterval(loadETHPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  // Load data when wallet connects
  useEffect(() => {
    if (wallet) {
      loadPortfolio()
      loadTransactions()
    }
  }, [wallet])

  const value = {
    wallet,
    ethPrice,
    portfolio,
    transactions,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    refreshPortfolio,
    sendTokens,
    filterTransactions,
    showMessage
  }

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  )
}
