const db = require("../models");
const Mail = db.mail;
const Op = db.Sequelize.Op;

exports.create = (req, res) =>{
    const mail = {
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        message: req.body.message,
        sender_id: req.body.sender_id,
        owner_id: req.body.owner_id,
        recent: req.body.recent,
    };

    Mail.create(mail).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
            err.message || "Some errors occured while sending the mail"
        });
    });
};

exports.findall = (req, res)=>{
    const name = req.query.name;
    var condition = name ? { name: {[Op.iLike]: `%${name}`}} : null;

    Mail.findAll({
        where: condition,
    }).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving mails"
        });
    });

};

exports.findOne = (req, res) =>{
    const id = req.params.id;
    
    Mail.findByPk(id).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
            err.message || `Fail to find mail with id: ${id}`
        });
    });
};

exports.findAllByOwnerId = (req, res) =>{
    const owner_id = req.params.id;

    Mail.findAll({
        where: { owner_id: owner_id}
    }).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(300).send({
            message:
            err.message || `Error finding all the mails from owner`
        });
    });

};

exports.update = (req, res)=>{
    const id = req.params.id;

    Mail.update(req.body, {
        where: { id: id}
    }).then((num)=>{
        if(num==1){
            res.send({
                message: "mail was update successfully"
            })
        }else{
            res.send({
                message: `Cannot update mail with id=${id}`
            });
        }
    }).catch((err)=>{
        res.status(300).send({
            message: err.message || `Cannot update mail with id ${id}`
        })
    })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    Mail.destroy({
        where: { id: id}
    }).then((num)=>{
        if(num == 1){
            res.send({
                message: "The message was deleted succesfully!"
            });
        }else{
            res.send({
                message: `Cannot delete the message with the specified id=${id}`
            });
        }
    }).catch((err)=>{
        res.status(300).send({
            message:
            err.message || `Cannot delete the message with the specified id=${id}`
        });
    });
};