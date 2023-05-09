<template>
  <div class="navbar search-navbar">
    <div class="container-fluid">
      <form action="" class="d-flex" role="search" onsubmit="return false;">
        <input v-model="query" class="search-input" type="text" placeholder="Search" required>
        <select v-model="when" class="when-select">
          <option value="" disabled selected>When</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="week">This week</option>
          <option value="next_week">Next week</option>
          <option value="month">This month</option>
          <option value="next_month">Next month</option>
        </select>
        <button v-if="!loading" @click="searchEvents(true)" type="submit" class="btn btn-light search-button">
          <i class="bi bi-search"></i>
          Search
        </button>
        <button v-else type="submit" class="btn btn-light search-button">
          <i class="bi bi-search"></i>
          <span style="margin-left: 5px; margin-right: 10px">Search</span>
          <div class="spinner-border float-end" style="height: 22px; width: 22px" role="status"></div>
        </button>
      </form>
    </div>
  </div>
  
  <div v-if="!resultsShown" class="results-wrapper"></div>
  <div v-else class="results-wrapper">

    <div v-if="!showDetails" class="results-container">
      <div v-for="item in results" :key="item.id" @click="showEventDetails(item)" class="card result-card mx-2 my-3">
        <div class="row g-0">
          <div class="col-2">
            <img v-if="item.thumbnail" :src="item.thumbnail" class="img-fluid rounded-start" alt="">
          </div>
          <div class="col-10">
            <div class="card-body">
              {{ item.title }}
              <div v-if="item.ticket_info" class="results-ticket-info-tag">
                <i class="bi bi-ticket-detailed" style="margin-right: 5px; color: green"></i>
                <span>Tickets available now!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button v-if="!moreLoading" @click="searchEvents(false);" class="btn btn-light load-more-button">Load more</button>
      <button v-else class="btn btn-light load-more-button">
        <span style="margin-left: 5px; margin-right: 10px">Load more</span>
        <div class="spinner-border float-end" style="height: 22px; width: 22px" role="status"></div>
      </button>
    </div>

    <div v-else class="results-container">
      <SearchDetailsComponent :result="resultDetails" />
    </div>

    <div class="map-container">
      <l-map ref="map" v-model:zoom="zoom" :center="center">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker v-for="item in results" :key="item.id" :lat-lng="JSON.parse(item.coordinates)" @click="showEventDetails(item)">
          <l-tooltip>{{ item.venue ? item.venue.name : item.title }}</l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>

</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import SearchDetailsComponent from '../components/SearchDetailsComponent.vue'
import L from "leaflet"


export default {
  name: 'HomeView',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    SearchDetailsComponent
  },
  data() {
    return {
      resultsShown: false,
      loading: false,

      moreLoading: true,
      loadMore: 0,

      query: '',
      when: '',

      results: [],
      showDetails: false,
      resultDetails: {},

      zoom: 11,
      center: [50.067437, 19.916022],
      arrayOfLatLngs: []
    }
  },
  methods: {
    searchEvents(newSearch) {
      if (this.query != '') {
        this.resetDetails();
        
        if (newSearch) {
          this.loading = true;

          // reset values connected to loading more events
          this.arrayOfLatLngs = [];
          this.loadMore = 0;
        } else {
          this.loadMore += 10;
          this.moreLoading = true;
        }
        
        let params = {
          q: this.query.trim().replace(/ /g, "+")
        };

        if (this.when !== '') {
          params['date'] = this.when;
        }

        if (!newSearch) {
          params['q..'] = this.loadMore;
        }

        this.axios.get(
          this.$config.BACKEND_URL + "/events", {params: params}
        )
        .then((response) => {
          if (newSearch) {
            this.results = response.data;
          } else {
            this.results.push.apply(this.results, response.data);
          }
        
          for (let i in this.results) {
            this.arrayOfLatLngs.push(JSON.parse(this.results[i].coordinates));
          }

          let bounds = new L.LatLngBounds(this.arrayOfLatLngs);
          this.center = [(bounds.getNorth() + bounds.getSouth())/2, (bounds.getEast() + bounds.getWest())/2]

          this.resultsShown = true;
          this.loading = false;
          this.moreLoading = false;
        })
        .catch(error => {
          this.loading = false;
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.errorMessage = error.response.data.message;

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser 
            // and an instance of http.ClientRequest in node.js
            this.errorMessage = error.request.data.message;

            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        })
      }
    },
    showEventDetails(result) {
      this.resultDetails = result;
      this.showDetails = true;
    },
    resetDetails(){
      this.resultDetails = {};
      this.showDetails = false;
    }
  }
}

</script>

<style src="@/assets/css/home.css"></style>
