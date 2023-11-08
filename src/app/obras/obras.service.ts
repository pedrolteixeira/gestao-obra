import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  async newObra(obra: any) {
    const user = await this.afAuth.currentUser;
    if (user) {
      obra.criadoPor = user.uid; 
      return this.firestore.collection('obras').add(obra);
    } else {
      return null;
    }
  }

  getObras(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('obras', ref => ref.where('criadoPor', '==', user.uid)).snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
        } else {
          return [];
        }
      })
    );
  }
  
  deleteObra(obraId: string) {
    return this.firestore.collection('obras').doc(obraId).delete();
  }
}