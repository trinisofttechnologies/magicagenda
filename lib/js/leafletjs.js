leafLetjs = {
	map : null,
	tempLoc : null,
	tempMarker : null,
	initialize: function() {
		L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
	    map = L.map('map', {
	        doubleClickZoom: false
	    }).setView([49.25044, -123.137], 13);

	    L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
	    navigator.geolocation.getCurrentPosition(function(p) {
	        // var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
	        console.log(p.coords.latitude);
	        console.log(p.coords.longitude);
	        map.panTo(new L.LatLng(p.coords.latitude, p.coords.longitude));
	    });
	    map.on('click', function(event) {
		        console.log(event.latlng.lat);
		        console.log(event.latlng.lng);
	    	if($(".fltng-icn").hasClass("open")){
	    		map.removeLayer(tempMarker);
	    		$(".fltng-icn").toggleClass("open");
	    	}else{
		        $(".fltng-icn").toggleClass("open");
		        tempMarker = L.marker( [event.latlng.lat, event.latlng.lng] ).bindPopup( '<a href="' + "test" + '" target="_blank">' + "test click" + '</a>' ).addTo( map );
		        tempLoc = event;
	    	}
	        // markers.addLayer(event.latlng);
	    });
	},
	addMarker: function(marker) {
		markers = [
		   {
		     "name": "Canada",
		     "url": "https://en.wikipedia.org/wiki/Canada",
		     "lat": 23.052250590287077,
		     "lng": 72.61187129999999
		   },
		   {
		     "name": "Anguilla",
		     "url": "https://en.wikipedia.org/wiki/Anguilla",
		     "lat": 23.052724451146172,
		     "lng": 72.62014389038087
		   },
		   {
		     "name": "Japan",
		     "url": "https://en.wikipedia.org/wiki/Japan",
		     "lat": 23.006278164146934,
		     "lng": 72.60057449340822
		   }
		];
		for ( var i=0; i < markers.length; ++i ) 
		{
		   L.marker( [markers[i].lat, markers[i].lng] ).bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' ).addTo( map );
		}
	},
	getLocation : function(marker){
		if(marker){
			tempLoc = marker;
		}
		return $.ajax({
		    url: 'http://nominatim.openstreetmap.org/reverse?format=xml&lat='+tempLoc.latlng.lat+'&lon='+tempLoc.latlng.lng+'&zoom=18&addressdetails=1',
		    dataType: 'xml',
		    success: function(response) {
				json = $.xml2json(response);
				// console.log(json);
				return json;
		    }
		});
		// console.log(doc.responseXML)
		// if(doc){
		// 	return $(doc.responseXML.firstChild.childNodes[1]).text();
		// }
	}
}