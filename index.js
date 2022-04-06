const express = require("express");
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const md5 = require('md5');
const microtime = require('microtime');
const { application } = require("express");
const { json } = require("body-parser");
const axios = require('axios');
const qs = require('query-string');
var multer = require('multer');

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Teamwebethics3!",
    database: "crud_database",
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.get('/getapi',(error,res)=>{
    const data = "select user_name From user";
    db.query(data,(err, result)=>{
        res.send(result);
    });
})
app.post('/api',(req,res) => {
    const user_name = req.body.user_name;
    const school = req.body.school;
    const sqlInsert = "INSERT INTO user (user_name,school) VALUES (?,?);";
    db.query(sqlInsert,[user_name,school], (err, result)=>{
        res.send('insert data in sql');
    });
    
});
app.post('/register',(req,res)=>{
    const user_name = req.body.user_name;
    const mobile_number = req.body.mobile_number;
    const user_email = req.body.user_email;
    const users_password = req.body.user_password;

    const auth = "SELECT mobile_no , user_email FROM register where mobile_no = ? or user_email = ?";
   
    db.query(auth,[mobile_number,user_email],(err,result)=>{
      
       if(result.length >0){
            res.send({'res':'Already user register'}) 
       }
       else {
        const sqlInsert = "INSERT INTO register (user_name,mobile_no,user_email,user_password) VALUES (?,?,?,?);";
        db.query(sqlInsert,[user_name,mobile_number,user_email,users_password], (err, rstl)=>{
            res.send({'status':'user register','data':rstl})   
        });
       }
    })

    // const sqlInsert = "INSERT INTO register (user_name,mobile_no,user_email,user_password) VALUES (?,?,?,?);";
    // db.query(sqlInsert,[user_name,mobile_number,user_email,users_password], (err, result)=>{

    //     res.send(result);
    // });
})
//INSERT INTO register 
app.delete('/delete',(req,res)=>{
    const mobile_no = 9898989898;
    const sqlInsert = "DELETE FROM register WHERE mobile_no = ?";
    db.query(sqlInsert,[mobile_no], (err, result)=>{
        res.send('delete register user');
    });
})

//Login User Form
app.post('/login',(req,res)=>{
const gmail = req.body.e_mail;
const password  = req.body.user_password;
let session_id = md5(microtime.now())
const sqllogin = "Select * FROM register WHERE user_email = ? and user_password = ?";
    db.query(sqllogin,[gmail,password], (err,data)=>{
       
        if(data.length === 0) {
           return{"res":"NOK"}
          }
        else {
         
           const id = data[0].id;
           const user_session_id = session_id; 
          
           const login_data =  db.query(`INSERT INTO login SET user_id = "${id}" , user_session_id = "${user_session_id}"`);
          

           const getid = (`select user_session_id From login where user_id=${id} LIMIT 1`);
           db.query(getid,(err,rslt)=>{
            res.send(rslt)
           })              
        }
    });
})

//Login User Data 5803b9bd48b0419b9e2fc1514a1f3dcb
app.post('/home',(req,res)=>{
    const session_id = req.body.sessionid;
    const data = (`select user_id from login where user_session_id="${session_id}"`);

    db.query(data,(err, result)=>{
        id = result[0].user_id; 
        const data2 = (`SELECT s.*,l.* FROM login l RIGHT JOIN register s ON l.user_id  = s.id WHERE  s.id = ${id}`);
        db.query(data2,(err, result)=>{
            res.send({"data":result});    
        });
    })

})
//Upload photo In database
app.post('/upload',(req,res)=>{

  userimg = multer(req.body.user_img);
  console.log(userimg)

});

//-----------------------Linkedin---------------------//

// Constand
const urlToGetLinkedInAccessToken = 'https://www.linkedin.com/oauth/v2/accessToken';
const urlToGetUserProfile ='https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))'
const urlToGetUserEmail = 'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';
app.get('/getUserCredentials', function (req, res) {
  const user = {};
  const code = req.query.code;
  const accessToken = getAccessToken(code);
  const userProfile = getUserProfile(accessToken);
  const userEmail = getUserEmail(accessToken);
  let resStatus = 400;
  if(!(accessToken === null || userProfile === null || userEmail === null)) {
    user = userBuilder(userProfile, userEmail);
    resStatus = 200;
  }
  // Here, you can implement your own login logic
  // to authenticate new user or register him
  res.status(resStatus).json({ user });
})
/**
 * Get access token from LinkedIn
 * @param code returned from step 1
 * @returns accessToken if successful or null if request fails
 */
function getAccessToken(code) {
  let accessToken = null;
  const config = {
    headers: { "Content-Type": 'application/x-www-form-urlencoded' }
  };
  const parameters = {
    "grant_type": "authorization_code",
    "code": code,
    "redirect_uri": process.env.REDIRECT_URI,
    "client_id": process.env.CLIENT_ID,
    "client_secret": process.env.CLIENT_SECRET,
  };
  axios
    .post(
      urlToGetLinkedInAccessToken,
      qs.stringify(parameters),
      config)
    .then(response => {
      accessToken = response.data["access_token"];
    })
    .catch(err => {
      console.log("Error getting LinkedIn access token");
    })
    return accessToken;
}
/**
 * Get user first and last name and profile image URL
 * @param accessToken returned from step 2
 */
function getUserProfile(accessToken) {
  let userProfile = null;
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }
  axios
    .get(urlToGetUserProfile, config)
    .then(response => {
      userProfile.firstName = response.data["localizedFirstName"];
      userProfile.lastName = response.data["localizedLastName"];
      userProfile.profileImageURL = response.data.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
      // I mean, couldn't they have burried it any deeper?
    })
    .catch(error => console.log("Error grabbing user profile"))
  return userProfile;
}
/**
 * Get user email
 * @param accessToken returned from step 2
 */
function getUserEmail(accessToken) {
  const email = null;
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  };
  axios
    .get(urlToGetUserEmail, config)
    .then(response => {
      email = response.data.elements[0]["handle~"];
    })
    .catch(error => console.log("Error getting user email"))
  return email;
}
/**
 * Build User object
 */
function userBuilder(userProfile, userEmail) {
  return {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    profileImageURL: userProfile.profileImageURL,
    email: userEmail
  }
}

//-----------------------Linkedin---------------------//


app.listen(2002,() => {
    console.log('app listen in port 2002')
});

