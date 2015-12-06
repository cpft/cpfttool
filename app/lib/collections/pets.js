Pets = new Mongo.Collection('pets');


if (Meteor.isServer) {
  Pets.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });

			// postType:postType,
			// petType:petType,
			// petLocation:petLocation,
			// petSize:petSize,
			// petColor:petColor,
			// petSpotted:petSpotted,
			// petBreed:petBreed,
			// petGender:petGender,
			// petPhoto:petPhoto,
			// details:details,
			// finderName:finderName,
			// email:email,
			// ack:ack,
			// lat:lat,
			// lng:lng,
			// imageUrl:imageUrl

  // Pets.attachSchema(new SimpleSchema({
  //   postType: {
  //     type: Number,
  //     label: "Post Type"
  //     max: 100
  //   },
  //   petType: {
  //     type: Number,
  //     label: "Pet Type"
  //     max: 100
  //   },
  //   petLocation: {
  //     type: String,
  //     label: "Pet Location"
  //   },
  //   petSpotted: {
  //     type: String,
  //     label: "Pet Spotted Date"
  //   },
  //   petBreed: {
  //     type: Number,
  //     label: "Pet Breed"
  //   },
  //   petGender: {
  //     type: Number,
  //     label: "Pet Gender",
  // 	  allowedValues: ['Unknown', 'M', 'Hatchbacks', 'Vans', 'Sedans', 'Suvs', 'Trucks', 'Wagons'],
  //   }
  // }));
}
