module.exports = (sequelize, Sequelize)=>{
    const Mail = sequelize.define("mail", {
        name: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(100)
        },
        title: {
            type: Sequelize.STRING(150)
        },
        message: {
            type: Sequelize.STRING(1000)
        },
        sender_id: {
            type: Sequelize.INTEGER
        },
        owner_id: {
            type: Sequelize.INTEGER
        },
        recent: {
            type: Sequelize.BOOLEAN
        }
    });
    return Mail;
};