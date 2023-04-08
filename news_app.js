const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public")); // allows muiltple files into our web app
app.use(bodyParser.urlencoded({exptended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const Firstname = req.body.fname;
  const Lastname = req.body.lname;
  const Email = req.body.email;
  console.log(Firstname, Lastname, Email);
  const data = {
    members : [{
      email_address : Email,
      status : "subscribed" ,
      merge_field :{
        FNAME : Firstname ,
        LNAME : Lastname
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  console.log(jsonData);

  const url = "https://us12.api.mailchimp.com/3.0/lists/39385c6a58";
  const options = {
    method : "POST",
    auth: "darshanbattula7838:7be7de85c604ff1660bd8e3f0ce6e2a5-us12"
  }
  const request = https.request(url, options , function(response){
    const statuscode = response.statusCode;
    if(statuscode === 200){
      res.sendFile(__dirname + "/success.html");
      console.log(statuscode);
    }
    else{
      res.sendFile(__dirname + "/failure.html");
      console.log(statuscode);
    }
    response.on("data", function(data){

      console.log(data);
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("The server is running successsfully");
})

//API key : 7be7de85c604ff1660bd8e3f0ce6e2a5-us12
//ListID : 39385c6a58
