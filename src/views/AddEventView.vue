<template>
    <div class="add-event-wrapper">
        
        <div class="card add-event-card">
            <form action="">
                <h2 class="text-center mt-3">Add Event</h2>
                
                <div class="add-form-inputbox">
                    <input v-model="title" type="text" placeholder=" " required>
                    <label for="">Title</label>
                </div>

                <div class="add-form-inputbox" style="margin-top: 50px">
                    <textarea v-model="description" placeholder=" " rows="1" style="height: auto;" required></textarea>
                    <label style="padding-bottom: 15px;" for="">Description</label>
                </div>

                <div class="add-form-inputbox">
                    <input v-model="where" type="text" placeholder=" " required>
                    <label for="">
                        Where <span class="text-muted" style="font-size: 0.7em;">position on the map: {{ coordinates }}</span>
                    </label>
                </div>

                <div class="add-form-inputbox">
                    <input v-model="website" type="text" placeholder=" ">
                    <label for="">Event website <span class="text-muted" style="font-size: 0.7em;">(optional)</span></label>
                </div>

                <div class="add-form-inputbox">
                    <input v-model="when" type="date" placeholder=" " required>
                    <label for="">When</label>
                </div>

                <div class="add-form-inputbox">
                    <span v-for="index in ticketsCount" :key="index">
                        <input :id="'sourceInput' + index" style="width: 30%;" type="text" placeholder="source">
                        <input :id="'linkInput' + index" style="width: 60%;" type="text" placeholder="link">
                        <i v-if="index == ticketsCount" @click="addTicket" class="bi bi-plus-circle" style="cursor: pointer;"></i>
                    </span>
                    
                    <label for="" style="top: -5px;">Tickets <span class="text-muted" style="font-size: 0.7em;">(optional)</span></label>
                </div>

                <div class="add-form-inputbox">
                    <input v-model="photoLink" type="text" placeholder=" " required>
                    <label for="">Photo link</label>
                </div>

                <button v-if="!loading" @click="addEvent" type="submit" class="add-form-button">Add Event</button>
                <button v-else type="submit" class="add-form-button">
                    <span style="margin-left: 32px; line-height: 2em">Add Event</span>
                    <div class="spinner-border float-end" role="status"></div>
                </button>

            </form>
        </div>

        <div id="map-container-add">
        </div>
    </div>
</template>
  
<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import { toRaw } from "vue";
  
  export default {
    name: 'AddEventView',
    data() {
      return {
        title: '',
        description: '',
        when: '',
        where: '',
        website: '',
        photoLink: '',
        ticketsCount: 1,

        zoom: 11,
        center: [50.067437, 19.916022],
        coordinates: [50.067437, 19.916022],

        map: null,
        marker: null,

        loading: false
      }
    },
    created() {
        // get current location and use it for centering map if access granted
        const success = (position) => {
            this.center = [position.coords.latitude, position.coords.longitude];
            this.coordinates = this.center;
        };
        const error = (err) => {
            console.log(err);
        };
        navigator.geolocation.getCurrentPosition(success, error);

    },
    mounted() {
        this.map = L.map("map-container-add").setView(this.center, this.zoom);

        L.tileLayer(
            "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
        ).addTo(this.map);
        
        let outer_this = this;

        let icon = L.icon({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        this.marker = L.marker(this.coordinates, {icon: icon, draggable: true}).bindTooltip("Event location").addTo(toRaw(this.map));
        this.marker.on('drag', function(event) {
            let position = event.target.getLatLng();
            outer_this.coordinates = [parseFloat(position.lat.toFixed(6)), parseFloat(position.lng.toFixed(6))];
        })
    },
    methods: {
        addTicket() {
            this.ticketsCount += 1;
        },
        addEvent() {
            // check ticket info
            let ticket_info = [];
            for (let i = 0; i < this.ticketsCount; i++) {
                let source = document.getElementById("sourceInput" + (i + 1).toString()).value;
                let link = document.getElementById("linkInput" + (i + 1).toString()).value;

                if (source !== '' && link !== '') {
                    ticket_info.push({
                        source: source,
                        link: link
                    })
                }
            }

            let eventData = {
                title: this.title,
                description: this.description,
                where: this.where,
                when: this.when,
                photo: this.photoLink,
                coordinates: this.coordinates
            };

            if (ticket_info.length !== 0) {
                eventData['ticket_info'] = ticket_info;
            }

            if (this.website !== '') {
                eventData['link'] = this.website;
            }
            
        }
    }
  }
  
</script>
  
<style src="@/assets/css/add_event.css"></style>
  