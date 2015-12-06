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
	Session.set("petType", 1);
});

Template.report.onRendered(function () {
});

Template.report.onDestroyed(function () {
});
