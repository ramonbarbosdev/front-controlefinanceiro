export class Conta {
  private _id_conta!: number;

  private _cd_conta!: string;

  private _nm_conta!: string;

  private _id_tipoconta!: number;

  private _id_statusconta!: number;

  public get id_conta(): number {
    return this._id_conta;
  }
  public set id_conta(value: number) {
    this._id_conta = value;
  }

  public get cd_conta(): string {
    return this._cd_conta;
  }
  public set cd_conta(value: string) {
    this._cd_conta = value;
  }

  public get nm_conta(): string {
    return this._nm_conta;
  }
  public set nm_conta(value: string) {
    this._nm_conta = value;
  }

  public get id_tipoconta(): number {
    return this._id_tipoconta;
  }
  public set id_tipoconta(value: number) {
    this._id_tipoconta = value;
  }
  public get id_statusconta(): number {
    return this._id_statusconta;
  }
  public set id_statusconta(value: number) {
    this._id_statusconta = value;
  }
}
