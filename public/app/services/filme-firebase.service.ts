import { Injectable } from '@angular/core';
import { Filme } from '../models/filme';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FilmeFireBaseService {
  private PATH: string = 'filmes';

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {}

  getFilme(id: string) {
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getFilmes() {
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  inserirFilme(filme: Filme) {
    return this.angularFirestore.collection(this.PATH).add({
      nome: filme.nome,
      genero: filme.genero,
      imagem: filme.imagem,
      ano_lancamento: filme.ano_lancamento,
      descricao: filme.descricao,
      nota: filme.nota,
    });
  }

  editarFilme(filme: Filme, id: string) {
    return this.angularFirestore.collection(this.PATH).doc(id).update({
      nome: filme.nome,
      genero: filme.genero,
      imagem: filme.imagem,
      ano_lancamento: filme.ano_lancamento,
      descricao: filme.descricao,
      nota: filme.nota,
    });
  }

  enviarFilme(filme: Filme) {
    this.inserirFilme(filme);
  }

  excluirFilme(filme: Filme) {
    return this.angularFirestore.collection(this.PATH).doc(filme.id).delete();
  }
}
