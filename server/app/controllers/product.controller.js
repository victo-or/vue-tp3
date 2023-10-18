const db = require('../models')
const Product = db.products 

exports.findAll = (req, res) => {
    Product.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 'Table non trouvée'
        })
    })

}

exports.create = (req, res) => {
    //console.log(req.body)
    if(!req.body.nom || !req.body.photo || !req.body.prix || !req.body.description || !req.body.categorie){
        res.status(400).send({
            message: 'Tous les champs sont obligatoires'
        })
        return
    }
    Product.create(req.body)
    .then(data => {
        res.send(data)
    })
    .catch(e => {
        res.status(500).send({
            message: 'Ne peut être inséré dans la base de données'
        })
    })
}

exports.findByPk = (req, res) => {
    const id = req.params.id
    Product.findByPk(id)
    .then(data => {
        res.send(data)
    })
    .catch(e => {
        res.status(500).send({
            message: 'Donnée non trouvée'
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Product.destroy({
        where: {id:id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: 'Le produit est effacé'
            })
        }else{
            res.send({
                message: 'Ne peut être effacé'
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: 'Erreur de base de données'
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    Product.update(req.body, {
        where: {id:id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: 'Produit mis à jour'
            })
        }else{
            res.send({
                message: 'Ne peut être mis à jour'
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: 'Erreur de base de donnée'
        })
    })
}