<template>
  <nav class="navbar navbar-dark navbar-expand-lg border-bottom">
    <div class="container-fluid mx-3">
      <router-link to="/" class="navbar-brand">
        <img alt="MeetMe" src="../assets/img/logo.png" width="170" height="24">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">

        <!-- Logged out version -->
        <ul v-if="!loggedIn" class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </ul>

        <!-- Logged in version -->
        <ul v-else class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/add/event">Add Event</router-link>
          </li>
          <li class="nav-item active">
            <a class="nav-link" @click="logout()">Logout</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>
  
<script>
  import { useCookies } from "vue3-cookies";

  export default {
    name: "NavbarComponent",
    data() {
      return {
        loggedIn: (this.cookies.get('logged') && this.cookies.get('logged') === 'true')
      }
    },
    setup() {
      const { cookies } = useCookies();
      return { cookies };
    },
    methods: {
      logout() {
        this.axios.get(this.$config.BACKEND_URL + "/logout")
        .then(() => {
          // temporal solution - just for navbar configuration
          this.cookies.set('logged', false);
          this.loggedIn = false;

          this.$router.push('/home');
        })
        .catch(error => {
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
    }
  }
</script>

<style src="@/assets/css/navbar.css"></style>
