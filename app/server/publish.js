


Meteor.publish('Pets', function () {
  return Pets.find();
});