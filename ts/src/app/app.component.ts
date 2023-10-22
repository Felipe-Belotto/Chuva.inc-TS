import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  artigos: any[] = [];
  title = 'DevChuva';

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.carregarArtigos();

    setInterval(async () => {
      await this.carregarArtigos();
      this.cdr.detectChanges();
    }, 1000);
  }

  async carregarArtigos(): Promise<void> {
    try {
      const dadosAPI = await fetch('https://65331c74d80bd20280f642da.mockapi.io/artigos')
        .then((resposta) => resposta.json())
        .catch((erro) => {
          console.error('Erro na requisição:', erro);
          throw erro;
        });

      this.artigos = dadosAPI;
      this.renderizarArtigos(this.artigos);
    } catch (erro) {
      console.error('Erro ao carregar os artigos:', erro);
      throw erro;
    }
  }

    renderizarArtigos(dadosAPI: any[]): void {
    const listaArtigos = document.getElementById('listaArtigos');

    if (listaArtigos) {
      /* Inverte a lista de artigos para aparecer os criados por ultimo em cima */
      const dadosAPIInvertidos = [...dadosAPI].reverse();

      const artigosHTML = dadosAPIInvertidos.map((artigo) => 
        artigo.autorizado
          ? (`
           <li class="answered-topic">
              <div class="artigo-container">
                <h4 class="artigo-titulo ops-topic-subject">${artigo.assunto}</h4>
                <p class="artigo-autor">${artigo.autor}</p>
                <p class="artigo-conteudo">${artigo.conteudo}</p>
                <div class="artigo-botoes">
                  <button><img src="assets/img/artigo/menu.svg"></button>
                  <button><img src="assets/img/artigo/favoritar.svg"></button>
                  <button><p>${artigo.likes} like${artigo.likes !== 1 ? 's' : ''}</p></button>
                  <button id="botaoResposta-${artigo.id}"><p>${artigo.respostas.length} resposta${artigo.respostas.length !== 1 ? 's' : ''}</p></button>
                </div>
              </div> 

              <ul class="comments-container ${localStorage.getItem(`respostas${artigo.id}`) == "ativado" ? "" : "hidden"} "  id="listaRespostas-${artigo.id}">
                <li class="comment">
                  <div class="comentario-titulo-container">
                    <p class="artigo-autor">Teste</p>
                    <div>
                      <h5>Autor</h5>
                      <img src="assets/img/artigo/autor.svg">
                    </div>
                  </div>

                  <p class="artigo-conteudo">Teste</p>
                </li>
              </ul>
              
              <form class="formulario-comentario ${localStorage.getItem(`respostas${artigo.id}`) == "ativado" ? "" : "hidden"}" id="formularioResposta-${artigo.id}">
                <section class="preencher-container">
                  <div class="input-container">
                    <label for="inputComentarioConteudo">Resposta</label>
                    <textarea id="inputComentarioConteudo"></textarea>
                  </div>
                </section>
                <div class="botao-enviar">
                  <button>Enviar</button>
                </div>
              </form>
            </li>
            
            `)
          : (`<li class="no-answered-topic">
              <section class="no-answered-filter">
      
              <button id="botaoAutoriza-${artigo.id}">
              <img src="assets/img/artigo/verificacao.png">
              </button>

              <p>Aguardando feedback dos autores</p>

              <a href="#">Editar tópico</a>
              
              </section>

              <div class="artigo-container">
              <h1 class="artigo-titulo">${artigo.assunto}</h1>
              <p class="artigo-autor">${artigo.autor}</p>
              <p class="artigo-conteudo">${artigo.conteudo}</p>
                <div class="artigo-botoes">
                  <button><img src="assets/img/artigo/menu.svg"></button>
                  <button><img src="assets/img/artigo/favoritar.svg"></button>
                  <button><p>${artigo.likes} like${artigo.likes !== 1 ? 's' : ''}</p></button>
                  <button id="botaoResposta-${artigo.id}"><p>${artigo.respostas.length} resposta${artigo.respostas.length !== 1 ? 's' : ''}</p></button>
                </div>  
              </div>
            </li>
            `)
      ).join('');

      listaArtigos.innerHTML = artigosHTML;
      
      dadosAPIInvertidos.forEach((artigo) => {
        const botaoAutoriza = document.getElementById(`botaoAutoriza-${artigo.id}`);
        const botaoResposta = document.getElementById(`botaoResposta-${artigo.id}`);

        if (botaoAutoriza) {
          botaoAutoriza.addEventListener('click', () => {
           this.autorizarEAtulizar(artigo.id);
          });
        }
        if(botaoResposta) {
          botaoResposta.addEventListener("click", () => {
            localStorage.getItem(`respostas${artigo.id}`) == "ativado" ? 
            localStorage.setItem(`respostas${artigo.id}`, "desativado") :
            localStorage.setItem(`respostas${artigo.id}`, "ativado")

             this.carregarArtigos()
          } )
        }
      });

      this.cdr.detectChanges();
    } else {
      console.error('Elemento com ID listaArtigos não encontrado');
    }
}

  /* Função para autorizar o card como se o autor tivesse autorizado */
  async autorizaTopico(id: number) {
    try {
      const response = await fetch(`https://65331c74d80bd20280f642da.mockapi.io/artigos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          autorizado: true
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Falha ao autorizar tópico. Código de status: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.error("Erro ao autorizar tópico:");
      throw error;
    }
  }

  /* Função que une o autorizar para o card aparecer e o recarregamento do card */
  async autorizarEAtulizar(id: number): Promise<void> {
    try {
      await this.autorizaTopico(id);
      await this.carregarArtigos();
      this.cdr.detectChanges();
    } catch (error) {
      console.error("Erro ao autorizar e atualizar:", error);
      throw error;
    }
  }

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
    const botaoCriarTopico = document.querySelector("[data-btn-create-topic]") as HTMLButtonElement;
    const listaElementos: NodeList = document.querySelectorAll('[data-topico-inicial]');
    const arrayElementos: HTMLElement[] = [];
    const formulario: HTMLFormElement = document.querySelector("[data-formulario-topico]") as HTMLFormElement;
    const mensagemEnviado = document.querySelector("[data-topico-enviado]")

    listaElementos.forEach((element) => {
      if (element instanceof HTMLElement) {
        arrayElementos.push(element);
      }
    });

    arrayElementos.forEach((item) => {
      item.classList.add("hidden")
    })

    botaoCriarTopico?.classList.add("hidden")
    mensagemEnviado?.classList.add("hidden")
    formulario.classList.remove("hidden")
  }

  async enviarTopico(e: Event): Promise<void> {
    e.preventDefault();
    const formulario: HTMLFormElement = document.querySelector("[data-formulario-topico]") as HTMLFormElement;
    const botaoCriarTopico = document.querySelector("[data-btn-create-topic]") as HTMLButtonElement;
    const mensagemEnviado = document.querySelector("[data-topico-enviado]");
    const topicoAssuntoInput = document.querySelector("#topicoAssunto");
    const topicoConteudoInput = document.querySelector("#topicoConteudo");

    const assunto = (document.getElementById("topicoAssunto") as HTMLInputElement).value;
    const conteudo = (document.getElementById("topicoConteudo") as HTMLInputElement).value;

    botaoCriarTopico.classList.remove("hidden");
    formulario.classList.add("hidden");
    mensagemEnviado?.classList.remove("hidden");

    await this.enviaTopicoAPI(assunto, conteudo);

    await this.carregarArtigos();

    formulario.reset();
  }

  async enviaTopicoAPI(assunto: string, conteudo: string): Promise<void> {
    try {
      const response = await fetch("https://65331c74d80bd20280f642da.mockapi.io/artigos", {
        method: "POST",
        body: JSON.stringify({
          assunto: assunto,
          conteudo: conteudo,
          autor: "Felipe Eduardo Freire Belotto",
          Like: 0,
          Resposta: [],
          Respondido: false
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error('Erro ao enviar tópico:', error);
      throw error;
    }
  }
}
