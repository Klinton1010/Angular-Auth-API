const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=require('./model/user')
const db="mongodb+srv://klinton:saibaba330@eventdb.h3ket.mongodb.net/EventDB?retryWrites=true&w=majority"

//DB CONNECTION
mongoose.connect(db,err=>{
    if(err)
    console.log("ERROR OCCURED")
    else
    console.log("CONNECTED SUCCESSFULLY")
})
function verifyToken(req,res,next)
{
  if(!req.headers.authorization)
  {
    return res.status(401).send('unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1];
  if(token==null)
  {
    return res.status(401).send('unauthorized request')
  }

  let payload=jwt.verify(token,'secretkey')
  if(!payload)
  {
    return res.status(401).send('unauthorized request')
  }
  //req.userId=undefined
  req.userId=payload.subject;
  //req.userId=61058851a78c3132bcd46bed
  next();
}
//EMPTY ROUTE
router.get('/',(req,res)=>{
    console.log("calling get method")
    res.send("Data from API")
})
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjEwNTc0ZTZhNzhjMzEzMmJjZDQ2YmUxIiwiaWF0
//REGISTER ROUTE
router.post('/register',(req,res)=>{
    let userData=req.body;
    let user=new User(userData);
    user.save((err,register)=>{
        if(err)
        console.log("ERROR")
        else
        {
        let payload={subject:register._id};
        let token=jwt.sign(payload,'secretkey');
        res.status(200).send({token});
        }
    })
})

//LOGIN ROUTE
router.post('/login',(req,res)=>
{
    let userData=req.body;
    User.findOne({email:userData.email},(err,user)=>{
        if(err)
        {
            console.log("The error Occured"+err)
        }
        else
        {
            if(!user)
            {
                res.status(401).send("Data is unavailable")
            }
            else
            {
                if(user.password!=userData.password)
                {
                    res.status(401).send("Password is invalid")
                }
                else
                {
                    let payload={subject:user._id}
                    let token=jwt.sign(payload,'secretkey')
                    res.status(200).send({token});
                }
            }
        }
    })
})

//EVENTS
 router.get("/events",(req,res)=>{
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2021-07-02T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events)
 })
 //SPECIAL EVENTS

 router.get("/specialevents",verifyToken,(req,res)=>{
     let specialEvents = [
        {
          "_id": "1",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
        ]
        res.json(specialEvents)
 })
module.exports=router;

