import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  form_cadastrar: FormGroup
  isSubmitted: boolean = false

  constructor(
    private alertController: AlertController,
    private router: Router,
    private filmeService: FilmeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form_cadastrar=this.formBuilder.group({
      nome:["",[Validators.required]],
      nota:["",[Validators.required]],
      genero:["",[Validators.required]],
      imagem:["",[Validators.required]],
      ano_lancamento:["",[Validators.required]],
      descricao:["",[Validators.required]],
    })
  }

  get errorControl(){
    return this.form_cadastrar.controls
  }

  submitForm(): boolean{
    this.isSubmitted = true
    if(!this.form_cadastrar.valid){
      this.presentAlert("Menu","Erro","Preencha todos os campos!")
      return false
    }else{
      this.cadastrar()
    }
  }

  private cadastrar() {
    this.filmeService.inserir(this.form_cadastrar.value)
    this.presentAlert('Menu', 'Sucesso', 'Filme Cadastrado!')
    this.router.navigate(["/home"])
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
