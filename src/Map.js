import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet-rotatedmarker/leaflet.rotatedMarker';
import 'leaflet/dist/leaflet.css';
// import '../lib/mq-routing.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Nav from './Nav';
import GroundControlApi from './GroundControlApi';
import ReactInterval from 'react-interval';

// store the map configuration properties in an object,
// we could also move this to a separate file & import it if desired.
let config = {};
config.params = {
  center: [47.655769,8.538503],
  zoomControl: false,
  zoom: 16,
  maxZoom: 19,
  minZoom: 11,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};
config.tileLayer = {
  uri: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  params: {
    minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      geojson: null
    };
    this._mapNode = null;
    this.updateMap = this.updateMap.bind(this);
  }

  componentDidMount() {
    // code to run just after the component "mounts" / DOM elements are created
    // create the Leaflet map object
    if (!this.state.map) this.init(this._mapNode);
  }

  componentDidUpdate(prevProps, prevState) {
    // code to run when the component receives new props or state
  }

  componentWillUnmount() {
    // code to run just before unmounting the component
    // this destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  updateMap(e) {
  }

  addGeoJSONLayer(geojson) {
    // create a native Leaflet GeoJSON SVG Layer to add as an interactive overlay to the map
    // an options object is passed to define functions for customizing the layer
    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filterFeatures
    });
    // add our GeoJSON layer to the Leaflet map object
    geojsonLayer.addTo(this.state.map);
    // store the Leaflet GeoJSON layer in our component state for use later
    this.setState({ geojsonLayer });
    // fit the geographic extent of the GeoJSON layer within the map's bounds / viewport
    this.zoomToFeature(geojsonLayer);
  }

  zoomToFeature(target) {
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [200,10],
      paddingBottomRight: [10,10]
    };
    // set the map's center & zoom so that it fits the geographic extent of the layer
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }

  init(id) {
    if (this.state.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, config.params);
    let droneIcon = L.divIcon({className: 'chevron'});
    this.droneMarker = L.marker([0,0], {rotationAngle: 0, icon: droneIcon});
    this.droneMarker.addTo(map);

    map.on('click', (e) => {
      console.log(e);
      GroundControlApi.commandRequest('goto', {lat: e.latlng.lat, lon: e.latlng.lng})
    })

    this.flightLatLngs = [];
    this.flightPath = L.polyline(this.flightLatLngs, {color: 'red'}).addTo(map);

    L.control.scale({ position: "bottomright"}).addTo(map);
    L.control.zoom({ position: "bottomleft"}).addTo(map);

    // a TileLayer is used as the "basemap"
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    // set our state to include the tile layer
    this.setState({ map, tileLayer });
  }

  render() {
    return (
      <div id="mapUI">
      <ReactInterval timeout={2000} enabled={true}
        callback={() => {
          GroundControlApi
           .telemRequest('position')
           .then((value) => {
            //  this.state.map.options.flyTo(value.Latitude, value.Longitude)
            let ll = new L.LatLng(value.Latitude, value.Longitude);
            this.flightLatLngs.push(ll);
            this.state.map.panTo(ll);
            this.flightPath.setLatLngs(this.flightLatLngs);
            this.droneMarker.setLatLng(ll);
            this.droneMarker.setRotationAngle(value.Heading);

            // if (MQ) {
            //   console.log(MQ, MQ.routing.directions());
            // }
           })
        }} />
        <MuiThemeProvider>
          <div>
            <Nav />
          </div>
        </MuiThemeProvider>
        <div style={{'marginTop': '-65px', 'position': 'static'}} ref={(node) => this._mapNode = node} id="map" />
      </div>
    );
  }
}

export default Map;
