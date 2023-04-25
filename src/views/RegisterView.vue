<template>
    <section class="form-section">
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
            <button @click="register" type="submit" class="form-button">Register</button>
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
        password: ''
      }
    },

    methods: {
      register() {
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
              "Content-Type": "application/json",
              "crossDomain": true
            }
          }
        )
        .then(() => {
          console.log("success");
          this.$router.push({path: 'home'})
        })
      }
    }
  }

</script>
  
<style src="@/assets/css/forms.css"></style>
