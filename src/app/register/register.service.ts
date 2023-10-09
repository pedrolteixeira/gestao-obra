import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  register(name: string, email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential: any) => {
          userCredential.user.updateProfile({
            displayName: name,
          })
          .then(() => {
            resolve(userCredential.user);
          })
          .catch((error: any) => {
            reject(error);
          });
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
