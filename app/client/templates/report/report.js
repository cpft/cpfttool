/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
var fileVal;
var fileData;
var imageUrl;

Template.report.events({
	"change #inputPetType": function (event) {
		Session.set("petType", $('input[name=petType]:checked').val());
	},
	"change #inputPetPhoto": function (event) {
		fileVal = event.target.files[0];		
		var reader = new FileReader();
		reader.onload = function(e) {
		  var rawData = reader.result;
		  var opt = {
			  	image: rawData,
			  	apiKey: "134dd87f0933693"
		  } 
		  Imgur.upload(opt, function(error, result) {
			  imageUrl = result.link;
		  });
		}
		fileData = reader.readAsDataURL(fileVal);
	},
	'click #submitbtn': function(event) {
		event.preventDefault();
		var postType = $("input[name='postType']:checked").val();
		var petType = $("input[name='petType']:checked").val();
		var petName = $("#inputPetName").val();
		var petLocation = $("input[name='petLocation']").val();
		var petAge = $("#inputPetAge").val();
		var petSize = $("input[name='inputPetSize']:checked").val();
		var petColor = $("#inputPetColor").val();
		var petSpotted = $("#inputPetSpottedDate").val();
		var petBreed = $("#inputPetBreed").val();
		var petGender = $("input[name='inputPetGender']:checked").val();
		var petPhoto = $("#inputPetPhoto").val();
		var details = $("#moreDetails").val();
		var finderName = $("#inputPetFinderName").val();
		var email = $("#inputPetFinderEmail").val();
		var ack = $("#ack").val();
		var lat = $("input[name='lat']").val();
		var lng = $("input[name='lng']").val();
		var options = {
			postType:postType,
			petType:petType,
			petName:petName,
			petAge:petAge,
			petLocation:petLocation,
			petSize:petSize,
			petColor:petColor,
			petSpotted:petSpotted,
			petBreed:petBreed,
			petGender:petGender,
			details:details,
			finderName:finderName,
			email:email,
			ack:ack,
			lat:lat,
			lng:lng,
			imageUrl:imageUrl
		}
		insertPetInfo(options);
		return false;
	}
	
});

insertPetInfo = function (options) {
	Pets.insert({
		postType:options.postType,
		petType:options.petType,
		petName:options.petName,
		petAge:options.petAge,
		petLocation:options.petLocation,
		petSize:options.petSize,
		petColor:options.petColor,
		petSpotted:options.petSpotted,
		petBreed:options.petBreed,
		petGender:options.petGender,
		petPhoto:options.petPhoto,
		details:options.details,
		finderName:options.finderName,
		email:options.email,
		ack:options.ack,
		lat:options.lat,
		lng:options.lng,
		imageUrl:options.imageUrl
	}, function(err, result) {
		if(result) {
			var path = "/map";
			Router.go(path);
		} else {
		}
	});

}


Template.registerHelper('equals', function (a, b) {
      return a == b;
    });

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.report.helpers({
	petType: function () {
		return Session.get('petType');
	}
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.report.onCreated(function () {
});

Template.report.onRendered(function () {
	Session.set("petType", 0);
	this.autorun(function () {
		if (GoogleMaps.loaded()) {
        	if (GoogleMaps.loaded()) {
				$("#autocomplete").geocomplete({
					map: $("#map"), details:"form"
    			});
			}
		}
	}); 
	
});

Template.report.onDestroyed(function () {
});

Meteor.startup(function() {
    GoogleMaps.load({
      libraries: 'places'
    });
});
