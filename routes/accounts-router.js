const router= require('express').Router();

const Accounts = require('../routes/accounts-model.js')

///////GET
router.get('/', (req, res) => {
    //req.query.limit = {limit: 5}
    Accounts.get().limit(req.query.limit)
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to retrieve accounts"})
        })
})

router.get('/:id',validateAccountId, (req, res) => {
    const id = req.params.id;
    
    Accounts.getById(id)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

///////POST

router.post('/',validatePost, (req, res) => {
    const newAccount = req.body;
    
    Accounts.insert(newAccount)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(error => {
            res.status(500).json(error)
        }) 
})

///////PUT

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body
    
    Accounts.update(id, changes)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to update user"})
        })
})

//////DELETE

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Accounts.remove(id)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

////Middleware

function validateAccountId(req, res, next) {
    const id = req.params.id;

    Accounts.getById(id)
        .then(account => {
            if(!account) {
                return  res.status(400).json({ message: "invalid account id"})
            }
        next()
        })
        .catch(error => {
            res.status(500).json(error)
        })
};


function validatePost(req, res, next) {
    const body = req.body;
    const name = req.body.name;
    const budget = req.body.budget;
    if(!name && !budget) {
        return res.status(400).json({ message: "name and budget required"})
    }
    if(!name) {
        return res.status(400).json({ message: "name required"})
    }
    if(!budget) {
        return res.status(400).json({ message: "budget required"})
    }
    next()    
};



module.exports = router;