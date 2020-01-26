var express = require('express')
var router = express.Router()
const db = require('../data/pg')
const bcrypt = require('bcrypt')
const validator =require('password-validator')
const emailValidator = require('email-validator')
const saltRounds = 10

const schema = new validator()
schema
.is().min(8)
.is().max(20)
.has().uppercase()
.has().digits()


router.get('/hello', function(req, res){
    db.query('SELECT * FROM czytelnicy')
    .then(pp=>{
      res.send(pp.rows)
    })
  })

router.post('/posting', (req,res)=>{
  res.json({siema:'siemano'})
})
router.post('/Register', (req,res)=>{
  const{login, password, password2, email} = req.body
  emailFlag = true
  passwordFlag = true
  doublePassworFlag = true
  notExistingEmialFlag = true
  if(!emailValidator.validate(email)){
    emailFlag = false
  }
  if(password != password2){
    doublePassworFlag = false
  }
  if(!schema.validate(password)){
    passwordFlag=false
  }
  if(passwordFlag && doublePassworFlag && emailFlag){
    const text2 = 'SELECT * FROM czytelnicy WHERE email=$1'
    const values2 = [email]
    db.query(text2, values2)
    .then(r=>{
      if(r.rows.length>0){
        existingEmialFlag=false
      }
    })
    .catch(e=>console.log(err))
  }
  if(passwordFlag&&doublePassworFlag&&emailFlag&&notExistingEmialFlag){
    const text = 'INSERT INTO czytelnicy(login, haslo, email) VALUES($1, $2, $3)'
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          const values = [login, hash, email]
          db.query(text, values)
          .then(r=>{
            res.send({isGut:true})
          })
          .catch(e=>console.log(e))
      });
    });
  }  
})
router.post('/Login', (req,res)=>{
  const{login, password} = req.body
  const text = 'SELECT * FROM czytelnicy WHERE login=$1'
  const values = [login]
  db.query(text, values)
  .then(r=>{
    console.log(r.rows)
    const hashed = r.rows[0].haslo
    bcrypt.compare(password, hashed, function(er, rr) {
      if(rr){
        res.send({isGut:true})
        console.log('Dobre haslo')
      }
      else{
        console.log({isGut:false})
      }
  });
  })
  .catch(e=>console.log(e))

})

router.get('/Egzemplarze',(req,res)=>{
  db.query('SELECT * FROM egzemplarze')
    .then(pp=>{
      res.send(pp.rows)
    })
})
module.exports = router