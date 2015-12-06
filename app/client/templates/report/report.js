/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.report.events({
	"change #inputPetType": function (event) {
		Session.set("petType", $('input[name=petType]:checked').val());
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
