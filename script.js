// Variables
let map;

// Location data
const locations = {
    "Blink Chelsea Gym": [83, 9, 45, 26, 15, 72, 54],
    "Parsons School of Design": [90, 58, 31, 23, 79, 8],
    "Madison Square Park": [61, 29, 95, 40, 7, 67, 36],
    "Hudson Yards": [55, 92, 2, 86, 43, 16],
    "Empire State Building": [89, 66, 18, 97, 25, 50, 74],
    "Central Park": [14, 84, 63, 42, 30, 59],
    "Washington Square Park": [65, 94, 48, 20, 12, 75, 88],
    "Times Square": [21, 70, 98, 11, 57, 80],
    "Saks Fifth Avenue": [41, 85, 17, 5, 28, 69, 32],
    "Rockefeller Center": [35, 93, 78, 37, 13, 60],
    "The Museum of Modern Art (MoMA)": [49, 1, 81, 91, 47, 87, 53],
    "One World Trade Center": [51, 64, 33, 76, 6, 39],
    "The Metropolitan Museum of Art": [62, 22, 77, 34, 10, 46],
    "Westside Market (on 23rd street)": [44, 4, 56, 96, 3, 52],
    "Thai Villa Restaurant": [68, 38, 19, 73, 82, 71, 24]
};

const locationCoordinates = {
    "Blink Chelsea Gym": [40.7465, -74.0014],
    "Parsons School of Design": [40.7352, -73.9947],
    "Times Square": [40.7580, -73.9855],
    "Bryant Park": [40.7536, -73.9832],
    "Empire State Building": [40.748817, -73.985428],
    "Central Park": [40.785091, -73.968285],
    "Rockefeller Center": [40.758740, -73.978674],
    "Madison Square Park": [40.742037, -73.988846],
    "Hudson Yards": [40.7541, -74.0008],
    "Saks Fifth Avenue": [40.758105, -73.977079],
    "The Museum of Modern Art (MoMA)": [40.761509, -73.978271],
    "One World Trade Center": [40.712742, -74.013382],
    "The Metropolitan Museum of Art": [40.779437, -73.963244],
    "Westside Market (on 23rd street)": [40.743733, -73.995326],
    "Thai Villa Restaurant": [40.738889, -73.990833]
};

const locationThoughts = {
    "Blink Chelsea Gym": "The energizing atmosphere helped me start the day with a good workout.",
    "Parsons School of Design": "The creativity here always leaves me feeling inspired.",
    "Madison Square Park": "A peaceful escape in the middle of the city that leaves me feeling relaxed.",
    "Hudson Yards": "The modern architecture and design ignited my curiosity.",
    "Empire State Building": "The breathtaking views from the top left me amazed.",
    "Central Park": "A stroll through the greenery brought a sense of peace amidst the urban hustle.",
    "Washington Square Park": "The lively atmosphere and street performances made me feel playful.",
    "Times Square": "The bustling crowds and bright lights were overwhelming, yet exciting.",
    "Saks Fifth Avenue": "The luxury brands and stylish displays filled me with excitement.",
    "Rockefeller Center": "The holiday decorations and ice-skating rink created a festive mood.",
    "The Museum of Modern Art (MoMA)": "The innovative art pieces sparked my artistic imagination.",
    "One World Trade Center": "The memorial evoked a sense of reflection and appreciation.",
    "The Metropolitan Museum of Art": "The vast collection of art enriched my understanding and appreciation of different cultures.",
    "Westside Market (on 23rd street)": "The fresh produce and friendly vendors always make me hungry for a home-cooked meal.",
    "Thai Villa Restaurant": "The authentic Thai cuisine left me well-fed and satisfied."
};

function getRandomLocations(count = 4) {
    const locationKeys = Object.keys(locations);
    const shuffledKeys = locationKeys.sort(() => 0.5 - Math.random());
    return shuffledKeys.slice(0, count);
}

function getCoordinatesForLocations(selectedLocations) {
    return selectedLocations.map(location => {
        const coordinatesKey = Object.keys(locationCoordinates).find(key => location.includes(key));
        if (!coordinatesKey) {
            console.error(`No coordinates found for location: ${location}`);
            return null;  // or handle this error in another appropriate way
        }
        return locationCoordinates[coordinatesKey];
    });
}


function initMap() {
    const mapOptions = {
        center: [40.7128, -74.0060],  // Manhattan coordinates
        zoom: 13
    };
    map = L.map('map', mapOptions);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);
}

function onGenerateRouteButtonClick() {
    const selectedLocations = getRandomLocations();
    const coordinates = getCoordinatesForLocations(selectedLocations);

    localStorage.setItem('selectedLocations', JSON.stringify(selectedLocations));
    const selectedThoughts = selectedLocations.map(location => locationThoughts[location]);
    localStorage.setItem('thought', JSON.stringify(selectedThoughts));

    const polylineOptions = {
        color: 'blue',
        weight: 6,
        opacity: 0.9
    };

    const polyline = L.polyline(coordinates, polylineOptions).addTo(map);
    map.fitBounds(polyline.getBounds());
    coordinates.forEach(coord => {
        L.marker(coord).addTo(map);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initMap();
    document.getElementById('generateRouteButton').addEventListener('click', onGenerateRouteButtonClick);
});

function startJourney() {
    window.location.href = "numberinp.html"; 
}

function goToRoute() {
    window.location.href = 'combined.html';
}
