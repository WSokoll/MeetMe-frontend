<template>
  <nav class="navbar navbar-expand-lg border-bottom">
    <div class="container-fluid mx-3">
      <router-link to="/" class="navbar-brand">
        <img alt="MeetMe" src="../assets/img/logo.png" width="170" height="24">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
<script>
  export default {
    name: "NavbarComponent",
    props: {}
  }
</script>

<style src="@/assets/css/navbar.css"></style>
