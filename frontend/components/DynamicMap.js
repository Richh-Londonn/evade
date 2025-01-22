
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function DynamicMap() {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const mapInstance = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.006, 40.7128], // Default center (New York City)
            zoom: 12,
        });

        // Example: Adding hazard markers
        const markers = [
            { lng: -74.006, lat: 40.7128, type: 'Hazard', description: 'Accident reported' },
            { lng: -73.935242, lat: 40.73061, type: 'Traffic', description: 'Heavy traffic' },
        ];

        markers.forEach((marker) => {
            const el = document.createElement('div');
            el.className = 'marker';
            new mapboxgl.Marker(el)
                .setLngLat([marker.lng, marker.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(marker.description))
                .addTo(mapInstance);
        });

        setMap(mapInstance);
        return () => mapInstance.remove();
    }, []);

    return <div id="map" style={{ width: '100%', height: '500px' }} />;
}
