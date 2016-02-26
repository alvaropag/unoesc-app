'use strict';

module.exports = function(api){
  var receitas = require('../controllers/receitas.controller');
  
  api.route('/receitas')
    .get(receitas.findAll);
  
  api.route('/receitas/:breweryIdFK')
    .get(receitas.receitasByBreweryId)
    .post(receitas.create);
    
  api.route('/receitas/:breweryId/:receitaId')
    .get(receitas.find)
    .put(receitas.update)
    .delete(receitas.delete);
    
  api.param('breweryIdFK', receitas.receitasByBreweryId);
  api.param('receitaId', receitas.receitaById);
}