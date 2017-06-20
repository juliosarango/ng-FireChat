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

  usuario:any = {}

  user: Observable<firebase.User>;
  userId: string;
  displayName:string;

  constructor( private aFire: AngularFireDatabase, public afAuth: AngularFireAuth) {
        this.user = afAuth.authState;
        //console.log(this.user);

        //también podemos comprobar de estar forma
      /*  if (localStorage.getItem('usuario')) {
          this.usuario = JSON.parse(localStorage.getItem('usuario'));
        }*/

        this.user.subscribe( (data) => {
          if (data) {
            this.userId = data.uid;
            this.displayName = data.displayName;
          }
        });

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
        nombre: this.displayName,
        mensaje: texto,
        uid: this.userId
    }
    //regresa una promesa
    return this.chats.push( mensaje );
  }

  login( proveedor ) {
    let provider;
    if (proveedor == "google"){
      provider = new firebase.auth.GoogleAuthProvider();
    }else {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    this.afAuth.auth.signInWithPopup(provider)
        .then((data) => {
        //  this.usuario = data;
        //  this.user = data;
          localStorage.setItem('usuario',JSON.stringify(data));
        });
  }

  logout() {
    localStorage.removeItem('usuario');
    //this.usuario = null;
    this.afAuth.auth.signOut().then( (data) => {
    });
  }

}
