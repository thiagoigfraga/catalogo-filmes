import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/models/filme';
import { FilmeFireBaseService } from 'src/app/services/filme-firebase.service';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filmes: Filme[];

  constructor(private router: Router, private filmeFS: FilmeFireBaseService) {
    this.carregarContatos();
  }

  carregarContatos() {
    this.filmeFS.getFilmes().subscribe((res) => {
      this.filmes = res.map((c) => {
        return {
          id: c.payload.doc.id,
          ...(c.payload.doc.data() as Filme),
        } as Filme;
      });
    });
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  irParaDetalhar(filme: Filme) {
    this.router.navigateByUrl('/detalhar', { state: { objeto: filme } });
  }
}
