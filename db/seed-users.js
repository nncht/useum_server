const mongoose = require('mongoose');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const users = [
    {
      "email": "johndoe@example.com",
      "password": "paSs1#word",
      "username": "John Doe"
    },
    {
      "email": "janedoe@example.com",
      "password": "Secr3t#word",
      "username": "Jane Doe"
    },
    {
      "email": "bobsmith@example.com",
      "password": "P@ssw0rd",
      "username": "Bob Smith"
    },
    {
      "email": "sarahjones@example.com",
      "password": "C00l#P@ss",
      "username": "Sarah Jones"
    },
    {
      "email": "davidbrown@example.com",
      "password": "3x@mpl3#",
      "username": "David Brown"
    },
    {
      "email": "julielee@example.com",
      "password": "MyP@ssw0rd",
      "username": "Julie Lee"
    },
    {
      "email": "michaelscott@example.com",
      "password": "Dund13#Mifflin",
      "username": "Michael Scott"
    },
    {
      "email": "jimhalpert@example.com",
      "password": "P@percl1p#",
      "username": "Jim Halpert"
    },
    {
      "email": "pambeesly@example.com",
      "password": "Beets&8ears",
      "username": "Pam Beesly"
    },
    {
      "email": "dwightschrute@example.com",
      "password": "SchruteF@rm5#",
      "username": "Dwight Schrute"
    },
    {
      "email": "larrydavid@example.com",
      "password": "Pr3tty#G00d",
      "username": "Larry David"
    },
    {
      "email": "chrissyteigen@example.com",
      "password": "L1p$ync1ng#",
      "username": "Chrissy Teigen"
    },
    {
      "email": "johncena@example.com",
      "password": "C3n@W1ns!",
      "username": "John Cena"
    },
    {
      "email": "emmastone@example.com",
      "password": "R3dC@rpet#",
      "username": "Emma Stone"
    },
    {
      "email": "bradpitt@example.com",
      "password": "Br@dP1tt#",
      "username": "Brad Pitt"
    },
    {
      "email": "angelinajolie@example.com",
      "password": "M@leficent5#",
      "username": "Angelina Jolie"
    },
    {
      "email": "leonardodicaprio@example.com",
      "password": "Osc@rW1nner#",
      "username": "Leonardo DiCaprio"
    },
    {
      "email": "sandrabullock@example.com",
      "password": "Gr@v1tyRul3z!",
      "username": "Sandra Bullock"
    },
    {
      "email": "kevinhart@example.com",
      "password": "Funn13$T#",
      "username": "Kevin Hart"
    },
    {
        "email": "kevin.kim@example.com",
        "password": "P@55w0rd#",
        "username": "Kevin Kim"
      },
      {
        "email": "hannah.kim@example.com",
        "password": "Pa$$w0rd1",
        "username": "Hannah Kim"
      },
      {
        "email": "andrew.you@example.com",
        "password": "Passw0rd!",
        "username": "Andrew You"
      },
      {
        "email": "grace.cho@example.com",
        "password": "P@ssword#1",
        "username": "Grace Cho"
      },
      {
        "email": "steven.park@example.com",
        "password": "Pa$$w0rd!",
        "username": "Steven Park"
      }
    ]
// Hash passwords before seeding
Promise.all(users.map(async user => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  return {
    email: user.email,
    password: hashedPassword,
    username: user.username
  };
}))
.then(hashedUsers => {
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/association_server';

  mongoose.connect(MONGO_URI)
  .then(() => {
    User.create(hashedUsers)
    .then(() => console.log('Database seeded with hashed passwords'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));
});



