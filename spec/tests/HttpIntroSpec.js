// This test case is trying to hit an invalid URL.
// Fix the assertions below so they all pass.
describe("HttpIntro Test Suite", function(){
	//var request = require('request');
	var request = require('C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\request');
	jasmine.getEnv().defaultTimeoutInterval = 30000;

	it("IDontKnowBill_Gates",function(done){
    
    	request.get(
    		{url: "http://en.wikipedia.org/wiki/IDontKnowBill_Gates",/*proxy:"http://10.4.8.204:8080",*/
    		 timeout: 5000}, 
    		 function(error, response, body){

			// console.log(response);
			expect(response.statusCode).toBe(404);
			expect(response.statusMessage).toBe('Not Found');
			expect(response.headers["content-type"]).toBe("text/html; charset=UTF-8");

			done();
    	});
    });

	// Fix the assertions below so they all pass.

	 it("Twitter",function(done){
	    
	    	request.get(
	    		{url: "https://api.twitter.com/1.1/friends/list.json",/*proxy:"http://10.4.8.204:8080",*/
	    		 timeout: 30000}, 
	    		 function(error, response, body){

				// console.log(response);
				expect(response.statusCode).toBe(400);
				expect(response.statusMessage).toBe('Bad Request');
				expect(response.headers["content-type"]).toBe("application/json;charset=utf-8");

				done();
	    });
	});

	// Fix the assertions below so they pass.

	 it("Weather",function(done){
	    
	    	request.get(
	    		{url: "http://api.openweathermap.org/data/2.5/weather?q=jaganperi",/*proxy:"http://10.4.8.204:8080",*/
	    		 timeout: 30000}, 
	    		 function(error, response, body){

				//console.log(response);
				expect(response.statusCode).toBe(200);
				expect(response.statusMessage).toBe('OK');
				expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");

				done();
	    });
	 });
     
	// This test case gets back json output from the openweather service.
	// Fix the test case so it can parse the json response correctly and
	// access the country field.
	 it("Weather-json",function(done){
	    
	    	request.get(
	    		{url: "http://api.openweathermap.org/data/2.5/weather?q=hyderabad",/*proxy:"http://10.4.8.204:8080",*/
	    		 timeout: 30000,
	    		  json: true}, 
	    		 function(error, response, body){

				//console.log(response);
				expect(body.sys.country).toBe("IN");

				done();
		    });
	});
	 it("Weather-xml",function(done){
	    
	    	request.get(
	    		{url: "http://api.openweathermap.org/data/2.5/weather?q=hyderabad&mode=xml",/*proxy:"http://10.4.8.204:8080",*/
	    		 timeout: 30000,
	    		  xml: true
                }, 
	    		 function(error, response, body){
				    //console.log(response);
                     xml2js = require('C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\xml2js');
                     var parser = new xml2js.Parser();
                     parser.parseString(body,function(err,result){
                        //console.log(result);
                         var obj=result.current.city[0].country[0];
                         //console.log(obj);
                         expect(obj).toBe("IN");
                     });
				

				done();
		    });
	});
});
