import React, { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = {
      id,
      message,
      type,
      duration,
      timestamp: new Date()
    }

    setNotifications(prev => [...prev, notification])

    // Auto remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const showSuccess = useCallback((message, duration = 5000) => {
    return addNotification(message, 'success', duration)
  }, [addNotification])

  const showError = useCallback((message, duration = 7000) => {
    return addNotification(message, 'error', duration)
  }, [addNotification])

  const showInfo = useCallback((message, duration = 5000) => {
    return addNotification(message, 'info', duration)
  }, [addNotification])

  const showWarning = useCallback((message, duration = 6000) => {
    return addNotification(message, 'warning', duration)
  }, [addNotification])

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showInfo,
    showWarning
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  )
}

const NotificationItem = ({ notification, onRemove }) => {
  const { id, message, type, timestamp } = notification

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle'
      case 'error':
        return 'fas fa-exclamation-circle'
      case 'warning':
        return 'fas fa-exclamation-triangle'
      case 'info':
      default:
        return 'fas fa-info-circle'
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <div className="notification-icon">
          <i className={getIcon()}></i>
        </div>
        <div className="notification-body">
          <div className="notification-message">{message}</div>
          <div className="notification-time">{formatTime(timestamp)}</div>
        </div>
        <button
          className="notification-close"
          onClick={() => onRemove(id)}
          aria-label="Close notification"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="notification-progress"></div>
    </div>
  )
}

export default NotificationSystem
