/*! main.js | GoodyearMap Page */
/*! This is Google Map Javascript API v3.16 */

var map;
function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(20, 0),
    scaleControl: true,
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_TOP
    },
    panControl: false,
    streetViewControl: true,
    streetViewControlOptions: {
    	 position: google.maps.ControlPosition.RIGHT_TOP
    }
  };

  //google.maps.visualRefresh=true;
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  // Load a GeoJSON from the same server as our demo.
  var jsonData = "data/GoodyearMissionaries.json";
  map.data.loadGeoJson(jsonData);

  // Add some style
  map.data.setStyle(function(feature) {
    var status = feature.getProperty("Current");
    if(status === "Yes"){
      return{
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      };
    }
    if(status === "No"){
      return{
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      };
    }

  });
  // adds offset to info window popup
  var infoWindow = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(0,-25),
  });

  // Set mouseover event for each feature.
  map.data.addListener("click", function(event) {
    name = event.feature.getProperty("Name");
    ward = event.feature.getProperty("Ward");
    mission = event.feature.getProperty("Mission");
    date = event.feature.getProperty("Date");
    current = event.feature.getProperty("Current");

    content = "<strong>" + name + "</strong>" + "</br>" + ward + "</br>" + mission + "</br>" + date + "</br>" + current ;
    infoWindow.setContent(content);

    var anchor = new google.maps.MVCObject();
	   anchor.set("position",event.latLng);
	   infoWindow.open(map,anchor);
  });

}
// Load google map
google.maps.event.addDomListener(window, "load", initialize);

// resize google map on screen change
google.maps.event.addDomListener(window, "resize", function() {
 var center = map.getCenter();
 google.maps.event.trigger(map, "resize");
 map.setCenter(center);
});



// Bindings
// =========================================>
$(document).ready(function() {
  //*** About modal binding
    $("#aboutInfo").load("views/about.html");
})