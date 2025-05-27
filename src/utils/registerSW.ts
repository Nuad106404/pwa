import { registerSW } from 'virtual:pwa-register';

export function initializeServiceWorker() {
  if ('serviceWorker' in navigator) {
    registerSW({
      onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
          return true; // Return true to trigger the update
        }
        return false;
      },
      onOfflineReady() {
        console.log('App ready to work offline');
      },
    });
  }
}