import { Injectable } from '@angular/core';
import { ObrasService } from '../obras/obras.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  public estoqueSelecionado: any;
  public obraSelecionada: any;
  
  constructor(
    public obrasService : ObrasService,
    public firestore: AngularFirestore, 
    public afAuth: AngularFireAuth
  ) { }

  
  getEstoquesDaObra(obraId: string): Observable<any[]> {
    return this.firestore.collection('estoque', ref => ref.where('obraId', '==', obraId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  async newEstoque(estoque: any) {
    const user = await this.afAuth.currentUser;
    if (user) {
      estoque.criadoPor = user.uid; 
      return this.firestore.collection('estoque').add(estoque);
    } else {
      return null;
    }
  }

  getEstoque(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('estoque', ref => ref.where('criadoPor', '==', user.uid)).snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
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

  async editEstoque(estoqueId: string, novoEstoqueFormData: any) {
    const user = await this.afAuth.currentUser;
    if (user) {
      return this.firestore.collection('estoque').doc(estoqueId).update(novoEstoqueFormData);
    } else {
      return null;
    }
  }

  deleteEstoque(estoqueId: string) {
    return this.firestore.collection('estoque').doc(estoqueId).delete();
  }
}
