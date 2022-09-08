import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  filme: Filme;
  nome: string;
  nota: number;
  genero: string;
  imagem: string;
  ano_lancamento: number;
  descricao: string;
  edicao: boolean = true;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private filmeService: FilmeService
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.filme = nav.extras.state.objeto;
    this.nome = this.filme.nome;
    this.nota = this.filme.nota;
    this.genero = this.filme.genero;
    this.imagem = this.filme.imagem;
    this.ano_lancamento = this.filme.ano_lancamento;
    this.descricao = this.filme.descricao;
  }

  alterarEdicao() {
    if (this.edicao == true) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  editar() {
    if (
      this.validar(this.nome) &&
      this.validar(this.nota) &&
      this.validar(this.genero) &&
      this.validar(this.imagem) &&
      this.validar(this.ano_lancamento) &&
      this.validar(this.descricao)
    ) {
      if (
        this.filmeService.editar(
          this.filme,
          this.nome,
          this.nota,
          this.genero,
          this.imagem,
          this.ano_lancamento,
          this.descricao
        )
      ) {
        this.presentAlert('Filmes', 'Sucesso', 'Dados do Filme Editado!');
        this.router.navigate(['/home']);
      } else {
        this.presentAlert('Filmes', 'Erro', 'Filme Não Encontrado!');
      }
    } else {
      this.presentAlert('Filme', 'Erro', 'Todos os campos são Obrigatórios!');
    }
  }

  excluir() {
    this.presentAlertConfirm(
      'Filmes',
      'Excluir Filme',
      'Você realmente deseja excluir o filme?',
    );
  }

  private excluirContato() {
    if (this.filmeService.excluir(this.filme)) {
      this.presentAlert('Filme', 'Excluir', 'Exclusão Realizada');
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('Filme', 'Excluir', 'Filme Não Encontrado!');
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

  async presentAlertConfirm(
    header: string,
    subHeader: string,
    message: string,
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          handler: ()=>{this.excluirContato()}
        }]
    });
    await alert.present();
  }
}
