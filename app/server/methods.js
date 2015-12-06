/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },
  'imgur/upload': function(fileVal) {
	  this.unblock();
	  var headers = {
		  Authorization: "Client-ID 134dd87f0933693"
	  }
	  var options = {
		  headers: headers,
		  data: fileVal
	  }
	  Meteor.http.call("POST", "https://api.imgur.com/3/", options, function(error, result) {
		  console.log(error);
		  console.log(result); 	
	  });
  }
});
