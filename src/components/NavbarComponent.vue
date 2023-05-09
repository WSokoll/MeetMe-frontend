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
        <ul v-if="!loggedIn()" class="navbar-nav">
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
        cookie: null
      }
    },
    setup() {
      const { cookies } = useCookies();
      return { cookies };
    },
    // mounted() {
    //   this.cookie = this.cookies.get("JSESSIONID");
    //   console.log(this.cookie)
    // },
    methods: {
      loggedIn() {
        return true;
      },
      logout() {
        // TBD
      }
    }
  }
</script>

<style src="@/assets/css/navbar.css"></style>
