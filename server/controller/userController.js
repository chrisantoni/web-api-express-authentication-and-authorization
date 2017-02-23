const User = require('../model/user')
const hash = require('password-hash')
const jwt = require('jsonwebtoken')

module.exports = {
  findAll: function (req, res, next) {
    User.find({}).then(function (users) {
      res.send(users)
    })
  },
  signUp: function (req, res, next) {
    if (req.body.password && req.body.username) {
      User.findOne({username:req.body.username},function(err,user){
        if(user)res.json("username already taken")
        else{
          var newUser = User({
            username: req.body.username,
            password: hash.generate(req.body.password)
          })
          newUser.save(function (err,user){
            if (err) throw err
            res.json("sign up successfully !")
          })
        }
      })
    }else{
      res.json("username and password cannot be blank")
    }
  },
  signIn: function (req, res, next) {
    User.findOne({ username: req.body.username }, function(err, data){
      if (err) throw err
      if (data) {
        console.log(data);
          if (hash.verify(req.body.password, data.password)) {
            let token = jwt.sign({username: data.username}, process.env.SECRET, { expiresIn: 60 * 60 })
            res.send(token)
          }else{
            res.json("wrong username or password")
          }
      }else{
        res.json("wrong username or password")
      }
    })
  },
  verifyToken: function (req, res, next) {
    var decode = jwt.verify(req.header('token'), process.env.SECRET)
    if (decode) {
      next()
    } else {
      res.send('you are not login')
    }
  }
}
