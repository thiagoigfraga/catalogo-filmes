import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Filme } from 'src/app/models/filme';
import { FilmeFireBaseService } from 'src/app/services/filme-firebase.service';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private filmeFS: FilmeFireBaseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form_cadastrar = this.formBuilder.group({
      nome: ['', [Validators.required]],
      nota: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
      ano_lancamento: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.form_cadastrar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_cadastrar.valid) {
      this.presentAlert('Menu', 'Erro', 'Preencha todos os campos!');
      return false;
    } else {
      this.cadastrar();
    }
  }

  private cadastrar() {
    this.showLoading('Aguarde', 3000);
    this.filmeFS
      .inserirFilme(this.form_cadastrar.value)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Agenda', 'Sucesso', 'Cliente Cadastrado!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Agenda', 'Erro', 'Erro ao cadastrar Contato!');
        console.log(error);
      });
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

  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });
    loading.present();
  }
}
