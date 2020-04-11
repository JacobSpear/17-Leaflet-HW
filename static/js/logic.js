// Creating map object
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 1
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// TODO:

// Store API query variables
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";


function getColor(num){
  blueness = Math.pow(0.8,num);
  red = 255*(1-blueness);
  blue = 255*(blueness);
  return `rgb(${red},20,${blue})`;
}

function getSize(num){
  return num*5000;
}


// Grab the data with d3
d3.json(url,function(data){
    data = data.features;
    console.log(data);
  var markers = L.layerGroup();
  data.forEach(function(doc,idx){
    coord = doc.geometry.coordinates;
    longitude = coord[0];
    latitude = coord[1];
    if (latitude){
      if (longitude){
        loc = [parseFloat(latitude),parseFloat(longitude)];
        mag = parseFloat(doc.properties.mag)
        settings = {
          color: getColor(mag),
          fillColor: getColor(mag),
          fillOpacity: 1
        }
        radius = getSize(mag);
        console.log(radius);
        circle = L.circle(loc,radius,settings)
        markers.addLayer(circle); 
        circle.on({
          click: function(event) {
            layer = event.target;
            layer.bindPopup(`Magnitude: ${mag}`);
          
          
          }
            
        });
        




      }
    }
  
    
  })
  

  myMap.addLayer(markers);
});
