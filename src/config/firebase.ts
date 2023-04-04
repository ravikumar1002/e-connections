import  {FirebaseOptions}  from "firebase/app";
import appConfigs from "./appConfigs";
const { apiKey, authDomain, projectId, storageBucket, messagingSenderId , appId, measurementId} = appConfigs.firebase

const firebaseConfigs: FirebaseOptions = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
}

export default firebaseConfigs