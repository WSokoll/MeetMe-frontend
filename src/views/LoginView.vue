<template>
  <section class="form-section">
    <div class="form-box form-box-login">
      <div class="form-value">
        <form action="" onsubmit="return false;">
          <h2 class="form-title">Login</h2>
          <div v-if="this.$route.query.registered" class="form-message">
            Please confirm your account through email before logging in.
          </div>
          <div class="inputbox">
            <i class="bi bi-person form-icon"></i>
            <input v-model="username" type="text" placeholder=" " required>
            <label for="">Username</label>
          </div>
          <div class="inputbox">
            <i class="bi bi-lock form-icon"></i>
            <input v-model="password" type="password" placeholder=" " required>
            <label for="">Password</label>
          </div>
          <button v-if="!loading" @click="login" type="submit" class="form-button">Log in</button>
          <button v-else type="submit" class="form-button">
            <span style="margin-left: 32px; line-height: 2em">Log in</span>
            <div class="spinner-border float-end" role="status"></div>
          </button>
          <div v-if="errorMessage" class="error-message-box">
            {{ errorMessage }}
          </div>
          <div class="register-link">
            <p>Don't have an account? <router-link to="/register">Register</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: false,
      loading: false
    }
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  methods: {
    login() {
      this.loading = true;

      this.axios.post(
        this.$config.BACKEND_URL + "/login",
        {
          username: this.username,
          password: this.password
        },
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(() => {
        // temporal solution - just for navbar configuration
        this.cookies.set('logged', true);

        this.$router.push('/home');
        this.loading = false;
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
