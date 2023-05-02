<template>
  <div class="navbar search-navbar">
    <div class="container-fluid">
      <form action="" class="d-flex" role="search">
        <input v-bind="query" class="search-input" type="text" placeholder="Search" required>
        <button type="submit" class="btn btn-light search-button">
          <i class="bi bi-search"></i>
          Search
        </button>
      </form>
    </div>
  </div>
  
  <div class="results-container">

    <!-- <div class="results-section">
    </div> -->

    <div class="map-container">
      <l-map ref="map" v-model:zoom="zoom" :center="[currentLocationLat, currentLocationLng]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>

        <l-marker :lat-lng="[41.8329, -87.7327]">
          <l-tooltip> Hi! I'm staying here on this location! </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";


export default {
  name: 'HomeView',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data() {
    return {
      query: '',
      zoom: 13,
      currentLocationLat: 50.067437,
      currentLocationLng: 19.916022
    }
  },
  created() {
    // get current location and use it for centering map if access granted
    const success = (position) => {
      this.currentLocationLat  = position.coords.latitude;
      this.currentLocationLng = position.coords.longitude;
    };
    const error = (err) => {
      console.log(err);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
</script>

<style src="@/assets/css/home.css"></style>
