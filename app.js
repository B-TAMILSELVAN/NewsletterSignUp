const express=require("express")

const bodyParser=require("body-parser")

const request=require("request")

const https=require("https")

const app=express()

app.use(express.static("Public"))

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})


app.post("/",function(req,res){
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;

  const data={
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  }

const jsonData=JSON.stringify(data)


const url="https://us11.api.mailchimp.com/3.0/lists/4ab3184f42"

const options={
  method:"POST",
  auth:"Tamilselvan:5ea792ce048da71f5d20fd71ba6fe0eb-us11"

}
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
  }
  else{
    res.sendFile(__dirname+"/failure.html")
  }
  response.on("data",function(){
    let temp=JSON.stringify(data)
    console.log(JSON.parse(temp))
  })
})

request.write(jsonData)
request.end()

})

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000")
})


