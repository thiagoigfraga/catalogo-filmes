export class Filme {
  private _id: any;
  private _nome: string;
  private _nota: number;
  private _genero: string;
  private _imagem: string;
  private _ano_lancamento: number;
  private _descricao: string;

  constructor(
    nome: string,
    nota: number,
    genero: string,
    imagem: string,
    ano_lancamento: number,
    descricao: string
  ) {
    let chave = new Date();
    this._id = chave.getTime();
    this._nome = nome;
    this._nota = nota;
    this._genero = genero;
    this._imagem = imagem;
    this._ano_lancamento = ano_lancamento;
    this._descricao = descricao;
  }

  public get id(): any {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }
  public get nota(): number {
    return this._nota;
  }

  public set nota(nota: number) {
    this._nota = nota;
  }

  public get genero(): string {
    return this._genero;
  }

  public set genero(genero: string) {
    this._genero = genero;
  }

  public get imagem(): string {
    return this._imagem;
  }

  public set imagem(imagem: string) {
    this._imagem = imagem;
  }

  public get ano_lancamento(): number {
    return this._ano_lancamento;
  }

  public set ano_lancamento(ano_lancamento: number) {
    this._ano_lancamento = ano_lancamento;
  }

  public get descricao(): string {
    return this._descricao;
  }

  public set descricao(descricao: string) {
    this._descricao = descricao;
  }
}
