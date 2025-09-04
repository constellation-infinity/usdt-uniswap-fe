import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import PriceSection from '../components/PriceSection'
import PortfolioSection from '../components/PortfolioSection'
import TransactionsSection from '../components/TransactionsSection'
import ActionsSection from '../components/ActionsSection'
import Footer from '../components/Footer'
import SendModal from '../components/SendModal'
import { BlockchainProvider } from '../context/BlockchainContext'

export default function Home() {
  return (
    <BlockchainProvider>
      <div className="app">
        <Head>
          <title>Blockchain Dashboard</title>
          <meta name="description" content="Modern blockchain dashboard with real-time ETH price tracking - Updated 2025" />
        </Head>
        
        <Header />
        
        <main className="main">
          <div className="container">
            <PriceSection />
            
            <div className="dashboard-grid">
              <PortfolioSection />
              <TransactionsSection />
            </div>
            
            <ActionsSection />
          </div>
        </main>
        
        <Footer />
        <SendModal />
      </div>
    </BlockchainProvider>
  )
}
