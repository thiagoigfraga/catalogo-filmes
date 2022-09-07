import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome: string;
  nota: number;
  genero: string;
  imagem: string;
  ano_lancamento: number;
  descricao: string;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private filmeService: FilmeService
  ) {}

  ngOnInit() {}

  cadastrar() {
    if (
      this.validar(this.nome) &&
      this.validar(this.nota) &&
      this.validar(this.genero) &&
      this.validar(this.imagem) &&
      this.validar(this.ano_lancamento) &&
      this.validar(this.descricao)
    ) {
      let filme: Filme = new Filme(
        this.nome,
        this.nota,
        this.genero,
        this.imagem,
        this.ano_lancamento,
        this.descricao
      );
      this.filmeService.inserir(filme);
      this.presentAlert('Menu', 'Sucesso', 'Filme Cadastrado!');
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('Menu', 'Erro', 'Todos os campos são Obrigatórios!');
    }
  }

  private validar(campo: any): boolean {
    if (!campo) {
      return false;
    }
    return true;
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
