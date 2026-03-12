export const showNotification = (title: string, message?: string) => {
  if (window.Notification?.permission === 'granted') {
    new window.Notification(title, { body: message });
  } else {
    alert(`${title}: ${message || ''}`);
  }
};
