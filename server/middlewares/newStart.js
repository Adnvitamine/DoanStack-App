const db = require("../models/");
const Role = db.role;
const User = db.user;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

function newStart() {

    db.sequelize
  .sync({
    force: true
  })
  .then(() => {
    console.log(
      "Drop and Resync Db"
      //"No Drop & Resync"
    );
    initial();
    createAdmin();
    
  });
}

function initial() {
    Role.create({
      id: 1,
      name: "user",
    });
  
    Role.create({
      id: 2,
      name: "moderator",
    });
  
    Role.create({
      id: 3,
      name: "admin",
    });
  }
  
  
  function createAdmin(){
    User.create({
      username: "Adn",
      email: "doan88nguyen@gmail.com",
      password: "admin123",
      passwordcrypt: bcrypt.hashSync("admin123", 8),
    })
      .then((user) => {
        const authorities = ["admin", "moderator", "user"];
        if (authorities) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: authorities,
              },
            },
          }).then((roles) => {
            user.setRoles(roles).then((res) => {
              console.log("ok");
            });
          });
        }})
      .catch((err) => {
        console.log(err.message);
      });
  }

  module.exports = newStart;

