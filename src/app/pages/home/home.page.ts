import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filmes: Filme[];

  constructor(private router: Router, private filmeService: FilmeService) {
    this.filmes = this.filmeService.filmes;
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  irParaDetalhar(filme: Filme) {
    this.router.navigateByUrl('/detalhar', { state: { objeto: filme } });
  }
}
