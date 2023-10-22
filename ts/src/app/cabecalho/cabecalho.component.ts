import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

@Input() imagemSrc: string = 'assets/img/perfil.jpg';
@Input() nomeUsuario: string = 'Visitante';

  constructor() { }

  ngOnInit(): void {
  }

  loginUsuario(){

    const nomeGitHub = prompt("Qual o seu nome no github ? (exemplo: fulano-ciclano)")

    if(nomeGitHub == null || nomeGitHub == undefined || nomeGitHub == "" || nomeGitHub == "null") {
      this.imagemSrc = 'assets/img/perfil.jpg'
      this.nomeUsuario= 'Visitante';
    } else {
    this.imagemSrc = `https://github.com/${nomeGitHub}.png`
    this.nomeUsuario= `${nomeGitHub}`
  }

}
}
