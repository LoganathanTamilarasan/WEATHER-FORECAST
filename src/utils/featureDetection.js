// src/utils/featureDetection.js
export const isBrowserSupported = () => {
    return 'geolocation' in navigator && 'fetch' in window;
};
