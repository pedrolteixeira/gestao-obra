import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  public pedidoSelecionado: any;
  constructor(
    public afAuth : AngularFireAuth,
    public firestore: AngularFirestore,
    public router: Router
  ) { }

  async newPedido(pedido: any) {
    const user = await this.afAuth.currentUser;
    if (user) {
      pedido.criadoPor = user.uid; 
      return this.firestore.collection('pedidos').add(pedido);
    } else {
      return null;
    }
  }

  async editPedido(pedidoId: string, novoPedidoFormData: any) {
    const user = await this.afAuth.currentUser;
    if (user) {
      return this.firestore.collection('pedidos').doc(pedidoId).update(novoPedidoFormData);
    } else {
      return null;
    }
  }

  getPedidos(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('pedidos', ref => ref.where('criadoPor', '==', user.uid)).snapshotChanges().pipe(
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
  
  deletePedido(pedidoId: string) {
    return this.firestore.collection('pedidos').doc(pedidoId).delete();
  }
}
