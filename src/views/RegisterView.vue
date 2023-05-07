<template>
    <section class="form-section form-section-register">
      <div class="form-box form-box-register">
        <div class="form-value">
          <form action="" onsubmit="return false;">
            <h2 class="form-title">Register</h2>
            <div class="inputbox">
              <i class="bi bi-person form-icon"></i>
              <input v-model="username" type="text" placeholder=" " required>
              <label for="">Username</label>
            </div>
            <div class="inputbox">
              <i class="bi bi-person form-icon"></i>
              <input v-model="firstName" type="text" placeholder=" " required>
              <label for="">First name</label>
            </div>
            <div class="inputbox">
              <i class="bi bi-person form-icon"></i>
              <input v-model="lastName" type="text" placeholder=" " required>
              <label for="">Last name</label>
            </div>
            <div class="inputbox">
            <i class="bi bi-envelope-at form-icon"></i>
              <input v-model="email" type="email" placeholder=" " required>
              <label for="">Email</label>
            </div>
            <div class="inputbox">
              <i class="bi bi-lock form-icon"></i>
              <input v-model="password" type="password" placeholder=" " required>
              <label for="">Password</label>
            </div>
            <button v-if="!loading" @click="register" type="submit" class="form-button">Register</button>
            <button v-else type="submit" class="form-button">
              <span style="margin-left: 32px; line-height: 2em">Register</span>
              <div class="spinner-border float-end" role="status"></div>
            </button>
            <div v-if="errorMessage" class="error-message-box">
              {{ errorMessage }}
            </div>
            <div class="login-link">
              <p>Already have an account? <router-link to="/login">Log in</router-link></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
<script>
  export default {
    name: 'RegisterView',
    data() {
      return {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        errorMessage: false,
        loading: false
      }
    },

    methods: {
      register() {
        this.loading = true;

        this.axios.post(
          this.$config.BACKEND_URL + "/registration",
          {
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(() => {
          this.$router.push({path: 'login', query: {registered: true}})
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
    }
  }

</script>
  
<style src="@/assets/css/forms.css"></style>
