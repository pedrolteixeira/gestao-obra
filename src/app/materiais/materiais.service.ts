import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaisService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  async newMaterial(material: any) {
    const user = await this.afAuth.currentUser;
    if (user) {
      material.criadoPor = user.uid; 
      return this.firestore.collection('materiais').add(material);
    } else {
      return null;
    }
  }

  getMateriais(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('materiais', ref => ref.where('criadoPor', '==', user.uid)).snapshotChanges().pipe(
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

  deleteMaterial(materialId: string) {
    return this.firestore.collection('materiais').doc(materialId).delete();
  }
}
