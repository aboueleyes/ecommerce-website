var express = require('express');
var router = express.Router();
var User = require('../database/user_model')
var mongoose = require ('mongoose');
const url = "mongodb+srv://shimaa:Shemo$2864@cluster0.f4td6.mongodb.net/MyDb?retryWrites=true&w=majority";
async function register (userName, password){
  await mongoose.connect(url)
  const user = new User ({userName : userName , password : password});  
  var verify = 'yes';
  await user.save().catch((err)=> {
      if (err) {
          verify = 'no'
      }
    });
return verify;
}
/* POST registration into db. */
router.post('/', (req, res, next) => {
  var userName = req.body.username;
  var password = req.body.password;
  register(userName, password).then(verify=>{
      console.log(verify)
      res.render('registration',{ok:verify})
  })
  
  
});
/* GET registration page*/
router.get('/', function (req, res, next)  {
    res.render('registration');
  });
  
module.exports = router;
