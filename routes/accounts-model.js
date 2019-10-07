const db = require('../data/dbConfig.js')




module.exports = {
    get,
    getById,
    insert
}



function get() {
    return db('accounts')
}

function getById(id) {
    return db('accounts')
      .where({ id })
      .first();
  }

  function insert(account) {
    return db('accounts')
    .insert(account)
    .then(ids => {
        return getById(ids[0]);
    })
  }
    
  