import { Injectable } from '@angular/core';
import { auth, db } from '../../../firebase.config'; // Modifica con il percorso corretto
import { getDoc, doc } from 'firebase/firestore';
import { User } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async getCurrentUser(): Promise<User | null> {
    return auth.currentUser;
  }

  // Metodo per ottenere il livello dell'utente
  async getUserLevel(uid: string): Promise<number | null> {
    const userRef = doc(db, 'adventurers', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData['level'];
    } else {
      return null;
    }
  }

  // Metodo per ottenere gli items dell'utente
  async getUserItems(uid: string): Promise<Array<any> | null> {
    const userRef = doc(db, 'adventurers', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData['items'];
    } else {
      return null;
    }
  }
}
