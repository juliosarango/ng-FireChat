import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AuthProviders, AuthMethdos} from 'angularfire2';
import { Mensaje } from '../interfaces/mensaje.interface';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;

  usuario:any = {
    nombre: 'Julio Sarango'
  }

  user: Observable<firebase.User>;

  constructor( private aFire: AngularFireDatabase, public afAuth: AngularFireAuth) {
        this.user = afAuth.authState;
  }

  cargarMensajes (){
    this.chats = this.aFire.list('chats', {
      query: {
        limitToLast: 20,
        orderByKey: true
      }
    });

    return this.chats;
  }

  agregarMensaje( texto:string ){

    let mensaje:Mensaje = {
        nombre: "Julio Sarango",
        mensaje: texto
    }
    //regresa una promesa
    return this.chats.push( mensaje );
  }

  login( proveedor ) {
    let provider;
    if (proveedor == "google"){
      console.log(proveedor);
      provider = new firebase.auth.GoogleAuthProvider();
    }else {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    this.afAuth.auth.signInWithPopup(provider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }


}
