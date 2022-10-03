import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { Filme } from 'src/app/models/filme';
import { FilmeFireBaseService } from 'src/app/services/filme-firebase.service';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  filme: Filme;
  edicao: boolean = true;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private filmeFS: FilmeFireBaseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.filme = nav.extras.state.objeto;
    this.form_cadastrar = this.formBuilder.group({
      nome: [this.filme.nome, [Validators.required]],
      nota: [this.filme.nota, [Validators.required]],
      imagem: [this.filme.imagem, [Validators.required]],
      descricao: [this.filme.descricao, [Validators.required]],
      genero: [this.filme.genero, [Validators.required]],
      ano_lancamento: [this.filme.ano_lancamento, [Validators.required]],
    });
  }

  get errorControl() {
    return this.form_cadastrar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_cadastrar.valid) {
      this.presentAlert('Agenda', 'Erro', 'Todos os campos são Obrigatórios!');
      return false;
    } else {
      this.editar();
    }
  }

  alterarEdicao(): void {
    if (this.edicao == false) {
      this.edicao = true;
    } else {
      this.edicao = false;
    }
  }

  editar() {
    this.filmeFS
      .editarFilme(this.form_cadastrar.value, this.filme.id)
      .then(() => {
        this.presentAlert('Catálogo', 'Sucesso', 'Edição Realizado');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.presentAlert('Catálogo', 'Erro', 'Erro ao editar Filme!');
        console.log(error);
      });
  }

  excluir(): void {
    this.presentAlertConfirm(
      'Agenda',
      'Excluir Filme',
      'Você realmente deseja excluir o filme?'
    );
  }

  excluirFilme() {
    this.filmeFS
      .excluirFilme(this.filme)
      .then(() => {
        this.presentAlert('Catálogo', 'Sucesso', 'Filme Excluído!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.presentAlert('Catálogo', 'Erro', 'Filme Não Encontrado!');
        console.log(error);
      });
  }

  private validar(campo: any): boolean {
    if (!campo) {
      return false;
    }
    return true;
  }

  async presentAlert(
    cabecalho: string,
    subcabecalho: string,
    mensagem: string
  ) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlertConfirm(
    cabecalho: string,
    subcabecalho: string,
    mensagem: string
  ) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelou');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.excluirFilme();
          },
        },
      ],
    });
    await alert.present();
  }
}
