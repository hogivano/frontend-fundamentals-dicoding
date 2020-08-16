import mapboxgl from 'mapbox-gl'

class Mapbox extends HTMLElement {
    constructor() {
        super()
        this._marker = []
        this._listMark = []
    }

    set markerOnMap(marker) {
        this._marker = marker
        this.loadMap()
    }

    connectedCallback() {
        this.render()
        mapboxgl.accessToken = process.env.TOKEN_MAPBOX
    }

    loadMap() {
        if (this._marker.length > 0) {
            let places = {
                'type': 'FeatureCollection',
                'features': []
            }

            this._marker.forEach(mark => {
                places.features.push({
                    'type': 'Feature',
                    'properties': {
                        'description': (mark.admin2 == null) ? (mark.provinceState == null) ? mark.countryRegion : mark.provinceState : mark.admin2,
                        'icon': 'embassy',
                        'detail': `
                            <p>
                                <strong>${(mark.provinceState == null) ? mark.countryRegion : mark.provinceState}</strong>
                            </p>
                            <br>
                            <p>
                                <b class="has-text-danger">Deaths : </b> ${mark.deaths} <br>
                                <b class="has-text-warning">Confirmed : </b> ${mark.confirmed} <br>
                                <b class="has-text-success">Recovered : </b> ${mark.recovered} <br>
                            </p>`
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [mark.long, mark.lat]
                    }
                })
            })

            const map = new mapboxgl.Map({
                container: "mapbox",
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this._marker[0].long, this._marker[0].lat],
                zoom: 4
            })

            map.on('load', function() {
                map.addSource('places', {
                    'type': 'geojson',
                    'data': places
                });

                map.addLayer({
                    'id': 'places',
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'text-field': ['get', 'description'],
                        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                        'text-radial-offset': 1.5,
                        'icon-image': '{icon}-15',
                        'icon-size': 1.8,
                        'icon-allow-overlap': true
                    }
                })

                map.on('click', 'places', function(e) {
                    let coordinates = e.features[0].geometry.coordinates.slice()
                    let detail = e.features[0].properties.detail

                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(detail)
                        .addTo(map);
                })
            })
        }
    }

    render() {
        this.innerHTML = `
            <style>
                .mapboxgl-popup-close-button {
                    top: 10px;
                    right: 10px;
                }
                .mapboxgl-popup-content {
                    padding-right: 30px;
                }
            </style>
            <div class="container mb-4">
                <div id="mapbox" style="width: 100%; height: 500px">
                </div>
            </div>
        `
    }
}

customElements.define('wrap-map', Mapbox)