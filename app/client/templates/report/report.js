/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.report.events({
	"change #inputPetType": function (event) {
		Session.set("petType", $('input[name=petType]:checked').val());
	},
	'submit form': function(event) {
		console.log("form submitted");
		var postType = $("input[name='postType']:checked").val();
		var petType = $("input[name='petType']:checked").val();
		var petLocation = $("input[name='petLocation']").val();
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
		console.log(postType);
		console.log(petType);
		console.log(petLocation);
		console.log(petSize);
		console.log(petColor);
		console.log(petSpotted);
		console.log(petBreed);
		console.log(petGender);
		console.log(petPhoto);
		console.log(details);
		console.log(finderName);
		console.log(email);
		console.log(ack);
		console.log(lat);
		console.log(lng);
		event.preventDefault();
		// Pets.insert({
		// 	catLocation:catlocation,
		// 	catSize:catSize,
		// 	catColor:color,
		// 	dateSpotted:catSpotted,
		// 	catBreed:breed,
		// 	catGender:gender,
		// 	catPhoto:photo,
		// 	moreDetails:details,
		// 	subscribeStatus:subscribe,
		// 	finderEmailID:email,
		// 	confirmStatus:ack,
		// 	lat:lat,
		// 	lng:lng
		// }, function(err, result) {
		// 	if(result) {
		// 		console.log(result);
		// 		// var path = "/pet/" + result;
		// 		var path = "/map";
		// 		Router.go(path);
		// 		// $("#success_alert").removeClass("hidden");
		// 		// $("#success_alert").fadeOut(3000, "slow");
		// 		// $("#success_alert").addClass("hidden");
		// 		// $("form[name='reportpetform']").reset();
		// 		// window.scrollTo(x-coord, y-coord);
		// 	}
		// });
		return false;
	}
	
});

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
				console.log("loaded");
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
