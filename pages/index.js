import React from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import PriceSection from '../components/PriceSection'
import PortfolioSection from '../components/PortfolioSection'
import TransactionsSection from '../components/TransactionsSection'
import ActionsSection from '../components/ActionsSection'
import Footer from '../components/Footer'
import SendModal from '../components/SendModal'
import { BlockchainProvider } from '../context/BlockchainContext'

export default function Home() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <BlockchainProvider>
      <motion.div 
        className="app"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Head>
          <title>Blockchain Dashboard</title>
          <meta name="description" content="Modern blockchain dashboard with real-time ETH price tracking - Updated 2025" />
        </Head>
        
        <Header />
        
        <main className="main">
          <motion.div 
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <PriceSection />
            </motion.div>
            
            <motion.div className="dashboard-grid" variants={itemVariants}>
              <PortfolioSection />
              <TransactionsSection />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ActionsSection />
            </motion.div>
          </motion.div>
        </main>
        
        <Footer />
        <SendModal />
      </motion.div>
    </BlockchainProvider>
  )
}
