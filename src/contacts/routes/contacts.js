//im triple awesome! bhargavi too
var express = require('express');
var router = express.Router();
//var contacts=new Array();
//var messages=new Array();
var bodyParser = require('body-parser');
var fs=require('fs');
//var num=0;
//-------------------------------------
//FILE SYSTEM
var getNumOfContacts = function(){
    var flag=false;
    var fileUrl = "./data/meta.json";
    var fd;
    var ret;
    try{
        console.log("enter try");
        ret=fs.readFileSync(fileUrl);
        console.log("no excep");
    }
    catch(err)
    {
        var obj=new Object();
        obj.num=Number(0);
        fs.writeFile(fileUrl,JSON.stringify(obj));
        flag=true;
    }
    console.log("returning :"+ret);
    if(flag)
        return 0;
    return JSON.parse(ret).num;
}

var putNumOfContacts=function(value){
    console.log("writing num");
    var fileUrl = "./data/meta.json";
    var obj=new Object();
    obj.num=Number(value);
    fs.writeFile(fileUrl,JSON.stringify(obj),function(err){});
    console.log("wrotenum");
    return;
}

var writeContactToFile = function(id,obj){
    var fileUrl="./data/"+id+"-Contact.json";
    fs.writeFile(fileUrl,JSON.stringify(obj));
}
var getContactFromFile = function(id){
    var fileUrl="./data/"+id+"-Contact.json";
    var obj=fs.readFileSync(fileUrl);
    return JSON.parse(obj);
}
//END OF FILE SYSTEM ROUTINES
//--------------------------------------
//SERVER LISTENING ROUTINES

// sends contact
router.get('/:id', function(req, res, next) {
    res.send(getContactFromFile(+req.params.id));//contacts[(+req.params.id)]);
});

//simple hello
router.get('/', function(req, res, next) {
    res.send("Welcome to contacts");
});

//saves a contact
router.post('/', function(req, res, next) {
    console.log("request to add");
    var con;
    con = req.body;
    con.messages=new Array();
    console.log("x");
    var num = getNumOfContacts();
    console.log("y");
    writeContactToFile(num,con);
    console.log("wrote contact");
    putNumOfContacts(num+1);
    console.log("came back after writing num");
    res.send(""+(num));
});

//saves a message
router.post('/:cid/message/',function(req,res,next){
    var c=getContactFromFile(+req.params.cid);
    c.messages.push(req.body);
    writeContactToFile(+req.params.cid,c);
    res.status(200).send(""+(c.messages.length-1));
});

//sends a message of cid
router.get('/:cid/message/:mid',function(req,res,next){
    console.log("getting back");
    var c=getContactFromFile(+req.params.cid);
    res.status(200).send(c.messages[+req.params.mid]);
});

//modifies a contact
router.put('/:id', function(req, res, next) {
    var obj1=getContactFromFile(+req.params.id);
    var obj2=req.body;
    for(var i in obj2)
    {
        obj1[i]=obj2[i];
    }
    writeContactToFile(+req.params.id,obj1);
    res.send(obj1);
});

module.exports = router;
