/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/

Meteor.methods({
  'lib/method_name': function () {
    
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    // server method logic
  },
  'imgurupload': function(fileVal, val) {
	  this.unblock();
	  console.log(fileVal);
	  var opt = {
		  data: {
		  	image: fileVal
		  },
		  // apiKey: "134dd87f0933693"
		  headers: {
			  Authorization: "Client-ID 134dd87f0933693"
		  }
	  }
	  console.log("value is " + val);
	  try {
	  	return Meteor.http.call("POST", "https://api.imgur.com/3/image", opt);
  	  }catch(error){
        throw new Meteor.Error("ImgurAPIFailure", error.message);
      }
	  // Imgur.upload(opt, function(error, result) {
	  // 		  return result;
	  // });
	  // return val;
	  
	  // Meteor.http.call("GET", "http://search.twitter.com/search.json?q=perkytweets", function(error, result) {
		  // callback(error,result);
	  // });
	  // console.log(callback);
	  // return Imgur.upload(opt);
	  // Imgur.upload(opt, function(error, result) {
	  // 		  console.log("result link is " + result.link);
	  // 			  // return result;
	  // 		  callback(error, result);
	  // });
  }
});
