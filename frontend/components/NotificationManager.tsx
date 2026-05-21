'use client';

// For now, we'll use a simple alert. This can be replaced with a more sophisticated toast notification system later.

export const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
  // In a real application, you would use a toast library or a custom notification component.
  // For this example, we'll just use alert and log to console.
  console.log(`[${type.toUpperCase()}] ${message}`);
  alert(`${type.toUpperCase()}: ${message}`);
};

export const NotificationManager = () => {
  // This component can be used to manage global toast notifications if needed in the future.
  // For now, we'll just export the showNotification function.
  return null; // Or return a component that renders toasts from a context
};
