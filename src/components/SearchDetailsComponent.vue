<template>
    <div class="card details-card mx-3" @scroll="toggleScrollIcon()">
        <div class="card-header">
            <div class="row">
                <div class="col-4">
                    <img class="rounded img-fluid" style="display: block; margin: auto;" :src="result.image">
                </div>
                <div class="col-8">
                    <div :class="'d-flex ' + (tickets_available ? 'justify-content-between' : 'justify-content-end')">
                        <div v-if="tickets_available" class="tickets-info-header">
                            <i class="bi bi-ticket-detailed" style="margin-right: 5px; color: green"></i>
                            <span>Tickets available now</span>
                        </div>
                        <i @click="closeDetails()" class="bi bi-box-arrow-left" style="cursor: pointer;"></i>
                    </div>
                    <h4 class="details-title">{{ result.title }}</h4>
                </div>
            </div>
        </div>
        <div class="card-body">
            <p v-if="description" style="margin-bottom: 0;">{{ description }}</p><br>

            <p style="margin-bottom: 5px"><b><i class="bi bi-clock" style="margin-right: 5px;"></i>When?</b></p>
            <p style="margin-bottom: 0;">{{ result.date.start_date }}&nbsp;&nbsp;<em style="font-size: 0.7em;"><nobr>{{ result.date.when }}</nobr></em></p>
            <hr style="width:70%;  border: 1px solid; margin-top: 0;">

            <p style="margin-bottom: 5px"><i class="bi bi-globe-americas" style="margin-right: 5px;"></i><b>Where?</b></p>
            <p style="margin-bottom: 0;"><nobr>{{ result.address[0] }}</nobr>&nbsp;&nbsp;<em style="font-size: 0.7em;"><nobr>{{ result.address[1] }}</nobr></em></p>
            <hr style="width:70%;  border: 1px solid; margin-top: 0;">

            <p v-if="result.link"><i class="bi bi-link-45deg" style="margin-right: 5px;"></i><b><a :href="result.link" style="text-decoration: none;">Event website</a></b></p>

            <p v-if="tickets_available" style="margin-bottom: 10px;"><i class="bi bi-ticket-detailed" style="margin-right: 5px;"></i><b>Tickets available at:</b></p>
            <ul v-if="tickets_available">
                <li v-for="info in result.ticket_info" :key="info.link"><a :href="info.link" style="text-decoration: none;">{{ info.source }}</a></li>
            </ul>

            <i class="bi bi-caret-down details-down-icon"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchDetailsComponent",
    props: {
        result: {}
    },
    data() {
        return{
            tickets_available: this.result.ticket_info ? true : false,
            description: this.result.description ? this.result.description : false
        }
    },
    methods: {
        closeDetails() {
            this.$parent.resetDetails();
        },
        toggleScrollIcon() {
            let icon = document.querySelector('.details-down-icon');
            icon.style.visibility = 'hidden';
        }
    }
}
</script>

<style src="@/assets/css/details.css"></style>
  