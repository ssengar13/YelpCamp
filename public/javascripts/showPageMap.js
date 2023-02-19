    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: JSON.parse(campground).geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
    });

    new mapboxgl.Marker()
     .setLngLat(JSON.parse(campground).geometry.coordinates)
     .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${JSON.parse(campground).title}</h3><p>${JSON.parse(campground).location}</p>`
        )
     )
     .addTo(map)