const express = require('express');
const requestHelper = require('axios');
const app = express();
const base62 = require("base62/lib/ascii");
const redis  = require('redis');
const cors = require('cors')
app.use(cors())
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.static('./public/uploads'));
const port = 3000;
const jwtDecode = require('jwt-decode');
const jwt = require("jsonwebtoken");
const {Client} = require('pg');
const multer = require('multer'); 
const bodyParser = require('body-parser');
const QuestionImageseStorage = multer.diskStorage({
  destination: (request, file, callBackFunction)=>{
    callBackFunction(null,"public/uploads/QuestionImages/"); 
  },
  filename: (request, file, callBackFunction)=> {
    const originalnameSplittedArray  = file.originalname.split('.');
    const extention = originalnameSplittedArray[originalnameSplittedArray.length - 1];
    FileNameCounter++;
    const name = base62.encode(FileNameCounter);
    const filename = name+'.'+extention; 
    redisConnetionClient.set('EducatalystFileNameCounter',FileNameCounter+1, function(){
      console.log("EducatalystFileNameCounter -> Updated")
    });
    callBackFunction(null, filename);
  }
})
//mimetype: 'image/png',
const ImageOnlyFileFilter = (req, file, callBackFunction)=>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'|| file.mimetype === 'image/svg+xml')
    callBackFunction(null, true)
  else 
    callBackFunction(null, false)
};


const multerUploadQuestionImages = multer({ 
  storage: QuestionImageseStorage,
  fileFilter: ImageOnlyFileFilter

 })
const redisConnetionClient     = redis.createClient({
  port      : 6379,              
  host      : 'localhost',        // replace with your hostanme or IP address
});
const databaseHandel = new Client("postgres://postgres:admin@localhost:5432/educatalyst");
databaseHandel.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/upload/questionImages', 
multerUploadQuestionImages.single('image'), (req, res)=>{
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.file); 
  const location = 'http://localhost:3000/QuestionImages/'+req.file.filename; 
  res.json({
    path : location
  })
} )
let FileNameCounter = 0; 

redisConnetionClient.get('EducatalystFileNameCounter' ,(err, value) => {
  if(err){
    console.error(err);
  }
  FileNameCounter = parseInt(value); 
  console.log(FileNameCounter);
})
app.get('/', function(req, res) {
  res.json({ message: base62.encode(FileNameCounter) });   
});
app.get('/api/auth/github', (gitHubLoginRequest,gitHubLoginResponce)=>{
 requestHelper
 .post("https://github.com/login/oauth/access_token",{
  client_id: "2dea4cc131cbde4d7085", 
  client_secret: "5589a8b7312c27ec364be882cf4e6006b2f9a51f",
  code: gitHubLoginRequest.query.code,
  redirect_uri : "http://localhost:3000/api/auth/github"
 })
 .then(result=>{
   let  datas = result.data.split("&");
   let authTokenarr = datas[0].split("="); 
   let authToken = authTokenarr[1];
   const AuthStr = 'Bearer '+authToken; 
   
  requestHelper
  .get('https://api.github.com/user', { 'headers': { 'Authorization': AuthStr } })
  .then(response => {
    const githubUserInfo = response.data; 
    const email =githubUserInfo.email; 
    if(email === null){
      gitHubLoginResponce.render('noEmailError')
    }
    else {
      const queryStr = "Select * from users where email = '" +email+"'";
      console.log(queryStr);
      databaseHandel.query(queryStr)
      .then(res => {
        console.table(res.rows);
        if(res.rows.length > 0){
          if(res.rows[0].account_type == "google" || res.rows[0].account_type == "local"){
            gitHubLoginResponce.render('emailAlreadyError');
          }
          else{
            gitHubLoginResponce.redirect('/api/auth/github/login?email='+email+'&role='+res.rows[0].user_role);
          }
        }
        else{
          gitHubLoginResponce.render('githubSelect', {
            name: githubUserInfo.name,
            token: authToken
          });

        }
      })
      .catch(err => {
        console.log("ERROR"); 
        console.error(err);
      })
    }
    
  })
  .catch(error =>{
    console.log(error);
    gitHubLoginResponce.render("unknownError");
  });
 })
 .catch(err => {
  gitHubLoginResponce.send("CATCH maa thi avoo choo");
 })
  // gitHubLoginResponce.send(gitHubLoginRequest.query.code);
})
app.get('/api/auth/google', (request, response) => {
    requestHelper
    .post('https://oauth2.googleapis.com/token', {
        client_id: '730867517729-ia2lv1efml0fekjogp2ku93ujll4tpfg.apps.googleusercontent.com',
        client_secret: 'cFhyThyBsB9ZGAs8iT8Tk4DK',
        code: request.query.code,
        grant_type:'authorization_code',
        redirect_uri:'http://localhost:3000/api/auth/google',
    
      })
      .then(res => {
          const userInfo = jwtDecode(res.data.id_token); 
          console.log(`statusCode: ${res.status}`);
          const queryString = "Select * from users where email = '"+userInfo.email+"'";
          console.log(queryString);
          databaseHandel.query(queryString)
          .catch(databaseHandelQueryError => console.error(databaseHandelQueryError))
          .then(databaseHandelQueryResult=>{
            console.table(databaseHandelQueryResult.rows);
              if(databaseHandelQueryResult.rows.length === 0){
                  const parms = `?nkvbhsfkunssntjbxrug=${res.data.id_token}`;
                  response.redirect('/api/auth/google/new/acc/select'+parms);
              }
              else {
                if(databaseHandelQueryResult.rows[0].account_type === "github" ||databaseHandelQueryResult.rows[0].account_type === "local"){
                  response.render('emailAlreadyError');
                }
                else{
                  response.redirect('/api/auth/github/login?email='+userInfo.email+'&role='+databaseHandelQueryResult.rows[0].user_role);
                }
              }

          })

      })
      .catch(error => {
        console.error(error)
      })

    // responce.send('hello');

});
app.get('/api/auth/github/new/acc/create', (req, createResponce)=>{ 
  console.log('Creation of github account');
  const AuthStr = 'Bearer '+req.query.nkvbhsfkunssntjbxrug; 
  const role = req.query.role; 
  requestHelper
  .get('https://api.github.com/user', { 'headers': { 'Authorization': AuthStr } })
  .then(gitUserResponce => {
    const UserData = gitUserResponce.data; 
    let name = ""; 
    if(UserData.name) name = UserData.name; 
    const user = {
      name : name,
      email : UserData.email,
      imageUrl : UserData.avatar_url,
      accountType : "github",
      phone: '',
      password: "gitLog",
      user_role: role
    }
    requestHelper
    .post('http://localhost:1236/adduser', user)
    .then(res => {
      console.log(res);
      //createResponce.send('Thai Gyoo'); 
      createResponce.redirect('/api/auth/github/login?email='+UserData.email+'&role='+role);
      
    })
    .catch(err => console.error(err)); 
  })
  })

app.get('/api/auth/google/new/acc/select', (req, res) => {
    const newUserInformation = jwtDecode(req.query.nkvbhsfkunssntjbxrug);
    console.log(newUserInformation); 
    res.render('select', {
      name: newUserInformation.given_name,
      token: req.query.nkvbhsfkunssntjbxrug
    });

});
app.get('/api/auth/google/new/acc/create', (createRequest, createResponce)=>{
  const role = createRequest.query.role;
  const token = createRequest.query.nkvbhsfkunssntjbxrug; 
  const newUserInformation = jwtDecode(token); 
  const user = {
    name : newUserInformation.name,
    email : newUserInformation.email,
    imageUrl : newUserInformation.picture,
    accountType : "google",
    phone: '',
    password: "gitLog",
    user_role: role
  }
  requestHelper
  .post('http://localhost:1236/adduser', user)
  .then(addUserResult =>{
    console.log(addUserResult);
    createResponce.redirect('/api/auth/github/login?email='+newUserInformation.email+'&role='+role);
  })
  .catch(error =>{
    createResponce.render("unknownError");
  })
  console.log(newUserInformation);

})
app.get('/api/auth/github/login',(req, res)=>{
  const email = req.query.email; 
  const info = {
    userName : email,
    password : "gitLog"
  }  
  requestHelper
  .post("http://localhost:1236/authenticate",info)
  .then(loginResult=>{
    // console.log(loginResult.data.result.token);
    const token = loginResult.data.result.token; 
    const userInfo = JSON.stringify(loginResult.data.result.user); 
    const role = loginResult.data.result.user.user_role; 
    res.render("closeAndRedirect",{
      token,
      userInfo,
      role
    });
  })
  .catch(err=>{
    console.error(err); 
    res.render("unknownError");
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
