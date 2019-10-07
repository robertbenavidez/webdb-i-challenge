const router= require('express').Router();

const Accounts = require('../routes/accounts-model.js')


router.get('/', (req, res) => {
    
    Accounts.get()
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to retrieve accounts"})
        })
})




module.exports = router;