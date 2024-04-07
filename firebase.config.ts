// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  deleteUser,
} from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  runTransaction,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBpY2FKTWe8iV3beFnxqMPYmR9bnj_69L0',

  authDomain: 'het-soul.firebaseapp.com',

  projectId: 'het-soul',

  storageBucket: 'het-soul.appspot.com',

  messagingSenderId: '210083835791',

  appId: '1:210083835791:web:ae55490ab5e478330ee5fa',

  measurementId: 'G-4CXBL7BBDL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const messaging = getMessaging(app);
const db = getFirestore();

async function loginWithGoogleDev() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Logged in user:', user);

    const userRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.get('registrationCompleted') !== true) {
      await deleteDoc(userRef);

      await deleteUser(user);
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

async function registerWithGoogleDev() {
  try {
    // Tentativo di accesso con Google
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Logged in user:', user);

    // Riferimento al documento dell'utente nella collezione 'adventurers'
    const userRef = doc(db, 'adventurers', user.uid);

    // Verifica se il documento utente esiste già
    const userSnapshot = await getDoc(userRef);

    // Se il documento non esiste, crea un nuovo documento utente con i dati iniziali
    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        level: 0,
        items: [],
        registrationCompleted: true // Assumi che la registrazione sia completa dopo questo passaggio
      });

      console.log('New adventurer registered:', user.uid);
    } else {
      console.log('Existing adventurer logged in:', user.uid);
    }
  } catch (error) {
    console.error('Error during registration/login:', error);
  }
}


async function logoutFromGoogle() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

async function getNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      getToken(messaging, {
        vapidKey:
          'BKOIvinydaKL00iJbhKrJNOQVuqq6lYM5jC8-1oyiI4OVLdBsB7X82XG_dSkvZmDD0tp-k2owyuE4_TUjaRmKo8',
      }) // Nota: sostituisci con la tua VAPID key
        .then(async (currentToken) => {
          if (currentToken) {
            console.log('User token:', currentToken);

            const user = auth.currentUser;
            if (user) {
              const userRef = doc(db, 'users', user.uid);
              await setDoc(
                userRef,
                { notificationToken: currentToken },
                { merge: true },
              );
            } else {
              console.warn(
                'Utente non autenticato. Non è possibile salvare il token.',
              );
            }
          } else {
            console.error(
              'No registration token available. Request permission to generate one.',
            );
          }
        })
        .catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
    }
  } catch (error) {
    console.error('Errore durante la richiesta del permesso:', error);
  }
}

async function sendNotification() {
  try {
    const user = auth.currentUser;
    if (user) {
      const response = await fetch(
        'https://us-central1-hacked23-24.cloudfunctions.net/sendNotification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: user.uid }),
        },
      );
      const data = await response.json();
    } else {
      console.warn('Utente non autenticato.');
    }
  } catch (error) {
    console.error("Errore durante l'invio della notifica:", error);
  }
}

async function sendNotificationDelayed() {
  try {
    const user = auth.currentUser;
    const delay = 3000; // 10 secondi

    if (user) {
      const response = await fetch(
        'https://us-central1-hacked23-24.cloudfunctions.net/sendNotificationDelayed',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: user.uid, delay: delay }),
        },
      );
      const data = await response.json();
    } else {
      console.warn('Utente non autenticato.');
    }
  } catch (error) {
    console.error("Errore durante l'invio della notifica:", error);
  }
}

async function removeUser() {
  const auth = getAuth();

  if (auth.currentUser) {
    try {
      await deleteUser(auth.currentUser);
    } catch (error) {
      console.error(
        "Errore durante l'eliminazione dell'utente da Firebase Auth:",
        error,
      );
    }
  } else {
    console.error('Nessun utente autenticato per essere eliminato.');
  }
}

onMessage(messaging, (payload) => {
  if (payload.notification) {
    const notificationTitle =
      payload.notification.title || 'Titolo predefinito'; // default in caso sia undefined
    const notificationOptions = {
      body: payload.notification.body || 'Corpo predefinito', // default in caso sia undefined
      // Qui puoi aggiungere altre opzioni come icone, suoni, ecc.
    };

    // Mostra la notifica
    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    } else {
      console.warn('Permesso per le notifiche non concesso.');
    }
  } else {
    console.warn('Notifica senza contenuto.');
  }
});

export { registerWithGoogleDev };
export { loginWithGoogleDev };
export { logoutFromGoogle };
export { getNotificationPermission };
export { sendNotification };
export { sendNotificationDelayed };
export { removeUser };
export { auth };
export { db };
