
const appConfigs = {
    firebase: {
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    }
}

export default appConfigs