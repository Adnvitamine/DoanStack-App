module.exports = (app) =>{
    const mails = require("../controllers/mail.controller");

    var router = require("express").Router();

    router.post("/", mails.create);
    router.get("/", mails.findall);
    router.get("/:id", mails.findOne);
    router.get("/owner_id/:id", mails.findAllByOwnerId);
    router.put("/:id", mails.update);
    router.delete("/:id", mails.delete);
    

    app.use("/api/mails", router);
}