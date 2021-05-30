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
      nome: nomeInfo[0]
    });
  },

  async validar(request, response) {
    const body = request.body;
    const info = await knex('infos').where({ nome: body.nome }).select('*').first();
    if (body.chave == deCriptoChave(info.chave)) {
      return response.json({
        success: true,
        totalPorcoes: info.totalPorcoes,
        ultimaPorcao: info.ultimaPorcao,
      });
    }
    return response.json({
      success: false
    })
  },

  async ler(request, response) {
    const id = request.params.id;
    if (id == 1) {
      const info = await knex('infos').where({ nome: "Payam Hungry" }).select('*').first();
      if (info.chave) {
        return response.json(info.status);
      }
      return response.json({
        success: false
      })
    }
    return response.json({
      success: false
    })
  },

  async pedir(request, response) {
    const body = request.body;
    const info = await knex('infos').where({ nome: body.nome }).select('*').first();
    if (body.chave == deCriptoChave(info.chave)) {
      const newInfo = {
        status: "PEDINDO",
        totalPorcoes: info.totalPorcoes,
        ultimaPorcao: info.ultimaPorcao
      }
      await knex('infos').where({ nome: body.nome }).update(newInfo);
      return response.json({
        success: true,
        totalPorcoes: newInfo.totalPorcoes,
        ultimaPorcao: newInfo.ultimaPorcao
      })
    }
    return response.json({
      success: false
    })
  },

  async finalizar(request, response) {
    const body = request.body;
    const info = await knex('infos').where({ nome: body.nome }).select('*').first();
    if (body.chave == deCriptoChave(info.chave)) {
      const newInfo = {
        totalPorcoes: info.totalPorcoes + 1,
        ultimaPorcao: novaData(),
        status: "PARADO"
      }
      await knex('infos').where({ nome: body.nome }).update(newInfo);
      return response.json({
        success: true
      })
    }
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
  var encryptedArray = chave.split(':');
  var iv = new Buffer.from(encryptedArray[0], 'hex');
  var encrypted = new Buffer.from(encryptedArray[1], 'hex');
  const decipher = crypto.createDecipheriv(DADOS.algoritmo, DADOS.segredo, iv);
  const decrypted = decipher.update(encrypted);
  return Buffer.concat([decrypted, decipher.final()]).toString();
}

function novaData() {
  var data = new Date().toLocaleString("pt-BR", { timeZone: "America/Cuiaba" });
  return data.replace(/ /g, "  -  ");
}