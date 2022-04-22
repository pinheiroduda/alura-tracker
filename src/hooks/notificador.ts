import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICA } from "@/store/tipo-mutacoes";
import {store} from '@/store'

type Notificador = {
  notificar (tipo: TipoNotificacao, titulo: string, texto: string) : void 
}
export default () : Notificador => {
  const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) : void => {
    store.commit(NOTIFICA, {
      tipo,
      titulo,
      texto
    })
  }

  return {
    notificar
  }
}