// script.js



document.addEventListener("DOMContentLoaded", function () {
    const districtButtons = document.querySelectorAll(".district-btn");
    const placesList = document.getElementById("places-list");

    // Add click event to district buttons to zoom to the district on the map
    districtButtons.forEach(button => {
        button.addEventListener("click", function () {
            const district = this.getAttribute("data-district");
            displayPlaces(district);
            zoomToRegion(district); // Zoom to the region on the map
        });
    });

    function displayPlaces(district) {
        placesList.innerHTML = ""; // Clear previous list
        const places = crowdData[district];

        // Sort by crowd density
        places.sort((a, b) => a.crowdDensity - b.crowdDensity);

        places.forEach(place => {
            const listItem = document.createElement("li");
            listItem.textContent = `${place.name} - ${place.crowdDensity}%`;
            listItem.addEventListener("click", () => showPlaceOnMap(place.name));
            placesList.appendChild(listItem);
        });
    }

    // Function to show the place on the map by zooming in
    function showPlaceOnMap(placeName) {
        const place = historicPlaces.find(p => p.name === placeName);
        if (place) {
            map.setView([place.lat, place.lng], 14); // Zoom in on the specific place
        }
    }
});


