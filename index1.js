var map = L.map('map').setView([15.3173, 75.7139], 6); // Centered on Karnataka

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define data with pictures for historic places
const placeData = {
    'Udupi Krishna Temple': {
        lat: 13.3400,
        lng: 74.7880,
        picture: 'https://example.com/udupi-krishna-temple.jpg', // Replace with actual picture URL
        hotels: [
            { name: 'Hotel Sagar', vacancies: 5 },
            { name: 'Hotel Ashraya', vacancies: 0 }
        ],
        lodges: [
            { name: 'Krishna Lodge', vacancies: 2 },
            { name: 'Udupi Lodge', vacancies: 1 }
        ]
    },
    'Kaup Lighthouse': {
        lat: 13.0530,
        lng: 74.8365,
        picture: 'https://example.com/kaup-lighthouse.jpg', // Replace with actual picture URL
        hotels: [
            { name: 'Beachside Hotel', vacancies: 3 },
            { name: 'Shoreline Stay', vacancies: 0 }
        ],
        lodges: [
            { name: 'Kaup Lodge', vacancies: 4 },
            { name: 'Sunset Lodge', vacancies: 0 }
        ]
    },
    'Mirjan Fort': {
        lat: 14.6674,
        lng: 74.5271,
        picture: 'https://example.com/mirjan-fort.jpg', // Replace with actual picture URL
        hotels: [
            { name: 'Fort View Hotel', vacancies: 2 },
            { name: 'Castle Hotel', vacancies: 0 }
        ],
        lodges: [
            { name: 'Mirjan Lodge', vacancies: 0 },
            { name: 'Historic Stay Lodge', vacancies: 1 }
        ]
    }
    // Add more places as needed
};

// Add buttons and markers for each place
Object.keys(placeData).forEach(placeName => {
    const { lat, lng, picture } = placeData[placeName];

    // Create a marker for the place
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`
            <img src="${picture}" alt="${placeName}" style="width: 100%; height: auto;">
            <h4>${placeName}</h4>
            <button class="place-button" onclick="showPlaceDetails('${placeName}', 'hotels')">View Hotels</button>
            <button class="place-button" onclick="showPlaceDetails('${placeName}', 'lodges')">View Lodges</button>
        `)
        .openPopup();
});

// Function to show details of hotels or lodges
function showPlaceDetails(placeName, type) {
    const placeDetails = placeData[placeName];
    const selectedData = placeDetails[type];
    let content = `<h4>${type.charAt(0).toUpperCase() + type.slice(1)} in ${placeName}</h4><ul>`;

    selectedData.forEach(item => {
        content += `<li style="background-color: ${item.vacancies > 0 ? '#d4edda' : '#f8d7da'}; color: ${item.vacancies > 0 ? 'green' : 'red'}; padding: 5px; margin: 5px; border-radius: 5px;">
                        ${item.name} - ${item.vacancies > 0 ? item.vacancies + ' Vacancies' : 'No Vacancies'}
                    </li>`;
    });
    content += '</ul>';

    L.popup()
        .setLatLng(map.getCenter()) // Adjust coordinates as needed
        .setContent(content)
        .openOn(map);
}
