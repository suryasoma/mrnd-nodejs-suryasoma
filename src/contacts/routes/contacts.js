var express = require('express');
var router = express.Router();
var arr=new Array();

/* GET contacts */
router.get('/:id', function(req, res, next) {
	var id=req.params.id;
	res.send(arr[id]);
});

router.post('/', function(req, res, next) {
  	var c = req.body;
  	c.messages=new Array();
  	arr.push(c);
  	res.send(arr.length-1+"");
});

router.put('/:id', function(req, res, next) {
	var b=req.body;
  	var id=req.params.id;
  	var key=Object.keys(b);
  	arr[id][key]=b[key];
  	res.send(arr[id]);
});

router.post('/:contact',function(req ,res ,next){
	var cid=req.params.contact;
	var msg=req.body.message;
	arr[cid].messages.push(msg);
	res.send(arr[cid].messages[arr[cid].messages.length-1]);
})

router.put('/:contact/:msgno',function(req,res,next){
	var cid=req.params.contact;
	var mid=req.params.msgno;
	var msg=req.body.message;
	console.log(msg);
	arr[cid].messages[mid]=msg;
	console.log(arr[cid]);
	res.send(arr[cid].messages[mid]);
})
module.exports = router;
