export interface ResponseValidarPedir {
  data: {
    success: boolean,
    totalPorcoes: number,
    ultimaPorcao: string
  }
}

export interface ResponseLer {
  data: {
    status: string,
    quantidade: string
  }
}