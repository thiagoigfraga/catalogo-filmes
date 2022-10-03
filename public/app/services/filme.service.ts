import { Injectable } from '@angular/core';
import { Filme } from '../models/filme';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private _filmes: Filme[] = [];

  constructor() {
    let filme = new Filme(
      'Senhor dos Aneis',
      4.5,
      'Aventura',
      'https://cdn.europosters.eu/image/1300/posters/lord-of-the-rings-fellowship-i11723.jpg',
      2003,
      'Um dos melhores filmes de aventura e ficção na idade média!'
    );
    this.inserir(filme);
  }

  public get filmes(): Filme[] {
    return this._filmes;
  }

  public inserir(filme: Filme) {
    this._filmes.push(filme);
  }

  public editar(
    filme: Filme,
    nome: string,
    nota: number,
    genero: string,
    imagem: string,
    ano_lancamento: number,
    descricao: string
  ): boolean {
    for (let i = 0; i < this._filmes.length; i++) {
      if (this._filmes[i].id == filme.id) {
        this._filmes[i].nome = nome;
        this._filmes[i].nota = nota;
        this._filmes[i].genero = genero;
        this._filmes[i].imagem = imagem;
        this._filmes[i].ano_lancamento = ano_lancamento;
        this._filmes[i].descricao = descricao;
        return true;
      }
    }
    return false;
  }

  public excluir(filme: Filme): boolean {
    for (let i = 0; i < this._filmes.length; i++) {
      if (this._filmes[i].id == filme.id) {
        this._filmes.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
