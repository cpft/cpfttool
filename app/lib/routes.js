Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', {
  // name: 'home',
	template:'map',
  controller: 'MapController',
  where: 'client'
});

Router.route('/map', {
  name: 'map',
  controller: 'MapController',
  where: 'client'
});

Router.route('/report', {
  name: 'report',
  controller: 'ReportController',
  where: 'client'
});