import { ResponseLer, ResponseValidarPedir } from "../interfaces/IResponse";
import api from "./api";

export function validar(nome: string, chave: string): Promise<ResponseValidarPedir> {
  return Promise.resolve(api.post('infos/validando', { nome, chave }, { timeout: 8000 }));
}

export function darRacao(nome: string, chave: string): Promise<ResponseValidarPedir> {
  return Promise.resolve(api.post('infos/pedindo', { nome, chave }, { timeout: 8000 }));
}

export function ler(): Promise<ResponseLer> {
  return Promise.resolve(api.get('infos/lendo/1'));
}