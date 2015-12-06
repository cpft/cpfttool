var lat;
var long;
var filter = {};
var mapInstance;
var pets = {};

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
  console.log(petsCollection);
  petsCollection.forEach(function(document){
  	  console.log(document);
	  var iconImage;
	  if(document.postType==0) {
	  	iconImage = "http://chart.apis.google.com/chart?cht=d&chdp=mapsapi&chl=pin%27i%5c%27%5bL%27-2%27f%5chv%27a%5c%5dh%5c%5do%5cFF1100%27fC%5c000000%27tC%5c000000%27eC%5cLauto%27f%5c&ext=.png";
	  } else {
	  	iconImage = "http://chart.apis.google.com/chart?cht=d&chdp=mapsapi&chl=pin%27i%5c%27%5bF%27-2%27f%5chv%27a%5c%5dh%5c%5do%5c009900%27fC%5c000000%27tC%5c000000%27eC%5cLauto%27f%5c&ext=.png";
	  }
        var marker = new google.maps.Marker({
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.lat, document.lng),
          map: mapInstance.instance,
          id: document._id,
		icon: iconImage
        });
  	  console.log(document._id);
  	  petVal = Pets.findOne({"_id": document._id});
  	  console.log(petVal);
	  var petInfo = "<img class=image-thumbnail src="+petVal.imageUrl+"/><br>";
	  petInfo += "<b>"
	  if(petVal.postType == 0) {
		  petInfo += "Lost ";
	  } else {
		  petInfo += "Found ";
	  }
	  if(petVal.petType == 0) {
	  	petInfo += "Dog "
	  } else if(petVal.petType == 1){
	  	petInfo += "Cat "
	  } else {
	  	petInfo += "Pet Animal "
	  }
	  petInfo += "on " + petVal.petSpotted;
	  petInfo += "</b>";
	  petInfo += "<br> Name: " 
	  if(petVal.petName) {
		petInfo += petVal.petName;
  	  } else {
		  petInfo += "Unknown";
  	  }
  	  petInfo +=  "<br>" + 	petVal.petSize + " " + petVal.petColor + " " + petVal.petBreed + " " + petVal.petGender + " " + petVal.petAge + " at <br>";
	  petInfo += petVal.petLocation;
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
