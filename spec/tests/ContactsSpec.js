
describe("Contacts Test Suite", function(){

		var idCreated;
	//var request = require('request');
	var request = require('C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\request')
	var base_url = "http://localhost:3000";
	var contacts_url = base_url + "/contacts";

	describe("hello world", function(){

		it("hello world",function(done){
		    
		    request.get(base_url, function(error, response, body){

				expect(response.statusCode).toBe(200);
				expect(body).toBe("Hello World");

				done();
		    });
		});

	});

	describe("create update contact", function(){

		it("should create contact",function(done){

			var contact = new Object();
			contact.firstName = "jagan";
			contact.lastName = "peri";
			contact.phone = "23002300";

			//console.log(JSON.stringify(contact));
		    
		    request.post({url: contacts_url,
		    			  body: contact,
		    			  json: true
		    			}, 
		    		    function(error, response, body){

							expect(response.statusCode).toBe(200);
							//console.log(body);
							idCreated = body;
							done();
					    });
		});

		it("should retrieve contact",function(done){

			request.get({
							url: contacts_url + "/" + idCreated,
							json: true
						},
		    		    function(error, response, body){

							expect(response.statusCode).toBe(200);
							//console.log(body);
							expect(body.firstName).toBe("jagan");
							done();
					    });
		});
		it("should update contact",function(done){

			var updatedContact = new Object();
			updatedContact.firstName = "jagan-updated";
			request.put({
							url: contacts_url + "/" + idCreated,
							body: updatedContact,
							json: true
						},
		    		    function(error, response, body){

							expect(response.statusCode).toBe(200);
							//console.log(body);
							expect(body.firstName).toBe("jagan-updated");
							expect(body.phone).toBe("23002300");
							done();
					    });
		});
	});

	//TODO: Fill out the test case below that posts a message to a contact
	// and retrieves it back.
	describe("post and get message to contact", function(){
        var midCreated;
		it("should post message to contact", function(done){
			//TODO: Write your test case here.
            var msg = new Object();
            msg.sender="yashwanth";
            msg.body="hi this is me";
            request.post({
                                url:contacts_url+"/"+"0"+"/"+"message",
                                body:msg,
                                json:true
                            },
                         function (error,response,body){
                            expect(response.statusCode).toBe(200);
                            midCreated=body;
                        done();
            });

		});

		it("should get message for contact", function(done){
			//TODO: Write your test case here.var msg = new Object();
            msg=new Object();
            msg.sender="yashwanth";
            msg.body="hi this is me";
            request.get({
                                url:contacts_url+"/"+"0"+"/"+"message/"+midCreated,
                                json:true
                            },
                         function (error,response,body){
                            expect(response.statusCode).toBe(200);
                            expect(body.sender).toBe("yashwanth");
                        done();
            });

		});

	});

});
