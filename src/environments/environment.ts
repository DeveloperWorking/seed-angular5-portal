/**
 * Configuração das rotas do APP para comunicação com a API
 */

export const environment = {
  production: true,
  currentEnvironment: 'dev',
  baseUrl: {
    dev: {
      urlApi: '[URL LOCALHOST DA API LOCAL]',
    },

    homolog: {
      urlApi: '[URL DA API EM HOMOLOG]',
    },

    prod: {
      urlApi: '[URL DA API EM PROD]',
    }
  },
};
