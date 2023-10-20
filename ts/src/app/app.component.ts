import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DevChuva';

  showMore() {
    const botaoVerMais = document.getElementById("btnShowMore");
    const botaoVerMenos = document.getElementById("btnShowLess");
    const listaParagrafos: NodeList = document.querySelectorAll('[data-paragrafo]');
    const arrayParagrafos: HTMLParagraphElement[] = Array.from(listaParagrafos, (p) => p as HTMLParagraphElement);
  
    (botaoVerMais as HTMLButtonElement).style.display = "none";
    (botaoVerMenos as HTMLButtonElement).style.display = "flex";
  
    arrayParagrafos.forEach((p) => {
      p.classList.remove('hidden');
    });
  }

  showLess(){
    const botaoVerMais = document.getElementById("btnShowMore");
    const botaoVerMenos = document.getElementById("btnShowLess");
    const listaParagrafos: NodeList = document.querySelectorAll('[data-paragrafo]');
    const arrayParagrafos: HTMLParagraphElement[] = Array.from(listaParagrafos, (p) => p as HTMLParagraphElement);

    (botaoVerMenos as HTMLButtonElement).style.display = "none";
    (botaoVerMais as HTMLButtonElement).style.display = "flex";


    arrayParagrafos.forEach((p) => {
      p.classList.add('hidden');
    });

   
  }
  
  
  
  

}


