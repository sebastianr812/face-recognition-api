const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express/lib/response');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');



const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port:5432,
      user : 'sebas',
      password : '',
      database : 'smart-brain'
    }
  });

 

const app = express();

app.use(bodyParser.json());
app.use(cors());


// app.get('/',(req,res)=>{
//     res.send('success!')
// })

app.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,bcrypt,db)})

app.post('/register', (req,res)=>{register.handleRegister(req,res,bcrypt,db)} )

app.get('/profile/:id', (req,res,)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{
    image.handleImage(req,res,db)
})

app.post('/imageurl', (req, res) => { image.apiCall(req,res)})




// Load hash from your password DB.







const PORT = process.env.PORT


app.listen(3000,()=>{
    console.log(`app is running on port ${PORT}`);
});
   






///////////////////////////////
/* YOU WANT TO HAVE A PLAN WITH YOUR API OR SERVER

 / --> res = this is working 
 /signin --> POST = sucess/fail 
 /register --> POST = users
 /profile/:userid --> GET = users
 /image --> PUT --> users score updated

*/

