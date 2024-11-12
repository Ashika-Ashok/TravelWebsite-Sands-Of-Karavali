



var map = L.map('map').setView([15.3173, 75.7139], 6); // Centered on Karnataka with a broader view

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// Initialize marker cluster group
var markers = L.markerClusterGroup();

// Add markers for historic places in the coastal region of Karnataka
var historicPlaces = [
    // Uttara Kannada
    { name: 'Mirjan Fort', lat: 14.6674, lng: 74.5271 },
    { name: 'Yellapur', lat: 14.6298, lng: 74.4450, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXVINTa1JnXLg8JX0bwPpLrYGxiQa7T8PnAziPoHXHqV3l2Njwn2pgF_kP7p2HW4VrWY&usqp=CAU'},
    { name: 'Honavar Fort', lat: 14.2950, lng: 74.4781 },
    { name: 'Kumta', lat: 14.5724, lng: 74.3662, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKfwdM0KJQHVvxRSV8rDQ4bis5W4IMyl9-qbKF9cA7ucaWhrcfhMy0Yw6WlAbZqx0eiOs&usqp=CAU' },

    // Udupi
    { name: 'Udupi Krishna Temple', lat: 13.3400, lng: 74.7880, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Udupi_Sri_Krishna_Matha_Temple.jpg/1200px-Udupi_Sri_Krishna_Matha_Temple.jpg' },
    { name: 'Kaup Lighthouse', lat: 13.0530, lng: 74.8365},
    { name: 'Malpe Beach', lat: 13.3200, lng: 74.7950, image: 'https://thrillingtravel.in/wp-content/uploads/2021/10/Malpe-beach-karnataka.jpg' },
    { name: 'St. Mary\'s Island', lat: 13.2916, lng: 74.7991, image: 'https://www.savaari.com/blog/wp-content/uploads/2024/04/St._Marys_Island.jpg'},
    // Dakshina Kannada
    { name: 'Mangalore Fort', lat: 12.9144, lng: 74.8561, image: 'https://via.placeholder.com/150?text=Mangalore+Fort' },
    { name: 'St. Aloysius Chapel', lat: 12.9184, lng: 74.8568, image: 'https://via.placeholder.com/150?text=St+Aloysius+Chapel' },
    { name: 'Kadri Manjunath Temple', lat: 12.9171, lng: 74.8522, image: 'https://via.placeholder.com/150?text=Kadri+Manjunath+Temple' },
    { name: 'Tannirbhavi Beach', lat: 12.9142, lng: 74.8318, image: 'https://via.placeholder.com/150?text=Tannirbhavi+Beach' },
    { name: 'Ullal Beach', lat: 12.8904, lng: 74.8257, image: 'https://via.placeholder.com/150?text=Ullal+Beach' },
    { name: 'Kudroli Gokarnath Temple', lat: 12.8772, lng: 74.8517, image: 'https://via.placeholder.com/150?text=Kudroli+Gokarnath+Temple' },
    { name: 'Sri Chattambi Swamigal Ashram', lat: 12.8600, lng: 74.8444, image: 'https://via.placeholder.com/150?text=Sri+Chattambi+Swamigal+Ashram' }
];

// Define locations for highlighting regions
var regionMarkers = [
    { name: 'Uttara Kannada', lat: 14.8300, lng: 74.5000, color: 'red' },
    { name: 'Dakshina Kannada', lat: 12.9150, lng: 74.8500, color: 'blue' },
    { name: 'Udupi', lat: 13.3400, lng: 74.7900, color: 'green' }
];

// // Add markers for the regions
regionMarkers.forEach(function(region) {
    L.marker([region.lat, region.lng], {
        icon: L.divIcon({
            className: 'region-marker',
            html: `<div style="background-color: ${region.color}; color: white; padding: 5px; border-radius: 5px; font-weight: bold; text-align: center;">${region.name}</div>`,
            iconSize: [100, 40]
        })
    }).addTo(map);
});

// Add markers for historic places in the coastal region of Karnataka
historicPlaces.forEach(function(place) {
    L.marker([place.lat, place.lng], {
        icon: L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: red; color: white; padding: 5px; border-radius: 5px; font-weight: bold; text-align: center;">
                    <div>${place.name}</div>
                    <img src="${place.image}" alt="${place.name}" style="width: 100px; height: auto;">
                </div>`,
            iconSize: [120, 120] // Adjust the size of the icon as needed
        })
    }).addTo(map);
});

// Add a zoom event to control visibility of historic places
map.on('zoomend', function() {
    if (map.getZoom() >= 10) { // Show historic places when zoom level is 10 or more
        historicPlaces.forEach(function(place) {
            L.marker([place.lat, place.lng], {
                icon: L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background-color:grey; color: white; border-radius: 5px; font-weight: bold; text-align: center;">
                            <div>${place.name}</div>
                            <img src="${place.image}" alt="${place.name}" style="width: 100px; height: auto;">
                        </div>`,
                    iconSize: [120, 120] // Adjust the size of the icon as needed
                })
            }).addTo(map);
        });
    } else {
        // Optionally clear markers if zoom level is less than 10
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker && layer.options.icon.options.className === 'custom-icon') {
                map.removeLayer(layer);
            }
        });
    }
});

// Initial zoom animation to coastal region
setTimeout(function() {
    map.setView([13.0, 74.8], 10); // Adjust zoom level to fit the coastal region
}, 2000); // 2-second delay