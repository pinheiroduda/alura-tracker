export enum TipoNotificacao {
  SUCESSO,
  ATENCAO,
  FALHA,
}

export interface INotificacao {
  id: number,
  tipo: TipoNotificacao,
  titulo: string,
  texto: string,
}