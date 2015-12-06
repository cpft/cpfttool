var lat;
var long;
var filter = {};
var mapInstance;

/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.map.events({
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.map.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(lat, long),
			zoom: 14
        };
      }
    }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.map.onCreated(function () {
  GoogleMaps.ready('map', function(map) {
	  mapInstance = map;
	  renderMap(filter);
  });
});
	
renderMap = function (filter) {
  petsCollection = Pets.find(filter);
 for (var petKey in pets) {
	 console.log(pets[petKey]);
	 pets[petKey].setMap(null);
 }
  pets = {};
  petsCollection.forEach(function(document){
	  console.log(document);
        var marker = new google.maps.Marker({
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.lat, document.lng),
          map: mapInstance.instance,
          id: document._id
        });
	  console.log(document._id);
	  petVal = Pets.findOne({"_id": document._id});
	  console.log(petVal);
	  var petInfo =  petVal.catSize + " " + petVal.catColor + " " + petVal.catBreed + " " + petVal.catGender + " Cat<	br> " + "<a href='/pet/" + document._id + "'>More Info</a>";
	  var info = new google.maps.InfoWindow({
	        content: petInfo
	  });


	  google.maps.event.addListener(marker, 'click', function() {
	      info.open(marker.getMap(), marker);
	  });
	  
        pets[document._id] = marker;
	  
  });
}

Template.map.onRendered(function () {
});

Template.map.onDestroyed(function () {
});

Meteor.startup(function(){
  if(navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(pos) {
		  lat = pos.coords.latitude;
		  long = pos.coords.longitude;
		  console.log(lat);
		  console.log(long);
		  GoogleMaps.load({
		libraries: 'places'
	});
	  });
  } else {
	  lat = 37.785271;
	  long = -112.3975806;
	  GoogleMaps.load({
		libraries: 'places'
	});
  }
});
