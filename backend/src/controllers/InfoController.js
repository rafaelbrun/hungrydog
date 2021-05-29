const knex = require('../database/connection.js');
const crypto = require("crypto");
const DADOS = require('../config/chave');

module.exports = {
  async create(request, response) {
    const chave = request.body.chave;
    const info = request.body;
    info.chave = criptoChave(chave);
    const nomeInfo = await knex('infos').insert(info);
    return response.json({
      success: true,
      nome: nomeInfo[0],
      ...info
    });

  },

  async index(request, response) {
    const nome = request.body.nome;
    const chave = request.body.chave;
    const info = await knex('infos').where({ nome: nome }).select('*').first();
    if (chave == deCriptoChave(info.chave))
      return response.json(info);

    return response.json({
      success: false
    })
  },
}

function criptoChave(chave) {
  var iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(DADOS.algoritmo, DADOS.segredo, iv);
  cipher.update(chave);
  const finalBuffer = cipher.final(DADOS.tipo);
  return iv.toString('hex') + ':' + finalBuffer.toString('hex')
}

function deCriptoChave(chave) {
  console.log(chave);
  var encryptedArray = chave.split(':');
  var iv = new Buffer.from(encryptedArray[0], 'hex');
  var encrypted = new Buffer.from(encryptedArray[1], 'hex');
  const decipher = crypto.createDecipheriv(DADOS.algoritmo, DADOS.segredo, iv);
  const decrypted = decipher.update(encrypted);
  return Buffer.concat([decrypted, decipher.final()]).toString();
}