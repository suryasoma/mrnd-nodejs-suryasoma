
describe("Contacts Test Suite", function(){

	//var request = require('request');
	var request = require('C:/Program Files/nodejs/node_modules/npm/node_modules/request')
	var base_url = "http://localhost:3000";
	var contacts_url = base_url + "/contacts";

	describe("hello world", function(){

		xit("hello world",function(done){
		    
		    request.get(base_url, function(error, response, body){
		    	//console.log(body);
				expect(response.statusCode).toBe(200);
				//expect(body).toBe("Hello World");
				done();
		    });
		});

	});

	describe("create update contact", function(){
		var idCreated;

		it("should create contact",function(done){

			var contact = new Object();
			contact.firstName = "jagan";
			contact.lastName = "peri";
			contact.phone = "23002300";

			console.log(JSON.stringify(contact));
		    
		    request.post({url: contacts_url,
		    			  body: contact,
		    			  json: true
		    			}, 
		    		    function(error, response, body){
		    		    	//console.log("hello"+response.statusCode);
							expect(response.statusCode).toBe(200);
							console.log(body);
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
							console.log(body);
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
							console.log(body);
							expect(body.firstName).toBe("jagan-updated");
							expect(body.phone).toBe("23002300");
							done();
					    });
		});
		it("message is posted",function(done){

			var updatedContact= new Object();
			var con=0;
			updatedContact.message="hello";
			request.post({
							url: contacts_url + "/" + con,
							body: updatedContact,
							json: true
						},
		    		    function(error, response, body){

							expect(response.statusCode).toBe(200);
							console.log(body);
							expect(response.body).toBe("hello");
							done();
					    });
		});
		it("message is posted",function(done){

			var updatedContact= new Object();
			var con=0;
			updatedContact.message="man";
			request.post({
							url: contacts_url + "/" + con,
							body: updatedContact,
							json: true
						},
		    		    function(error, response, body){

							expect(response.statusCode).toBe(200);
							expect(response.body).toBe("man");
							console.log(body);
							done();
					    });
		});
		it("message is edited",function(done){

			var updatedContact= new Object();
			var con=0;
			var msgno=1;
			updatedContact.message="hey you";
			request.put({
							url: contacts_url + "/" + con+"/"+msgno,
							body: updatedContact,
							json: true
						},
		    		    function(error, response, body){

							expect(response.statusCode).toBe(200);
							expect(response.body).toBe("hey you");
							console.log(body);
							done();
					    });
		});
		
	});
});
