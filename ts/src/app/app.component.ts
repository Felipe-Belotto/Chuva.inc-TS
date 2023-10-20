import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DevChuva';

  showMore() {

    /* Código para ver mais */

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
  showLess() {

    /* Código para saber se o usuário tentou selecionar o texto, caso tenha selecionado ele não irá fechar o resumo para caso queira copiar o texto: não tenha problemas com a função de abrir e fechar o resumo */

    const currentSelection = window.getSelection();
  
    const isTextSelected = currentSelection && currentSelection.toString().length > 0;
  
    if (isTextSelected) {
      return;
    }

    /* Código para ver menos */
  
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
  
 criarTopico() {
  const listaElementos: NodeList = document.querySelectorAll('[data-topico-inicial]');
  const arrayElementos: HTMLElement[] = [];

  listaElementos.forEach((element) => {
    if (element instanceof HTMLElement) {
      arrayElementos.push(element);
    }
  });

  arrayElementos.forEach((item) => {
    item.classList.add("hidden")
  })
}

enviarTopico(e: Event) {
  e.preventDefault();  
  const formulario: HTMLFormElement = document.querySelector("[data-formulario-topico]") as HTMLFormElement;

  formulario.classList.add("hidden")
  
}
  

  

}


