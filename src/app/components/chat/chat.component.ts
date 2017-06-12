import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  elemento: any;

  constructor(public chatService:ChatService) {
    this.chatService.cargarMensajes()
        .subscribe( () => {
          //console.log("mensajes cargados correctamente!!!!!!....")
          setTimeout( () => this.elemento.scrollTop = this.elemento.scrollHeight,75)
        });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar() {
    if (this.mensaje.length == 0){
      return;
    }
    this.chatService.agregarMensaje(this.mensaje)
         .then( () => console.log('mensaje enviado') )
         .catch( (error) => console.log(error) );
    this.mensaje = "";
  }

}
