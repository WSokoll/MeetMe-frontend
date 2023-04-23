<template>
    <section class="form-section">
      <div class="form-box form-box-register">
        <div class="form-value">
          <form action="">
            <h2 class="form-title">Register</h2>
            <div class="inputbox">
              <i class="bi bi-person form-icon"></i>
              <input type="text" placeholder=" " required>
              <label for="">Username</label>
            </div>
            <div class="inputbox">
              <i class="bi bi-person form-icon"></i>
              <input type="text" placeholder=" " required>
              <label for="">First name</label>
            </div>
            <div class="inputbox">
              <i class="bi bi-person form-icon"></i>
              <input type="text" placeholder=" " required>
              <label for="">Last name</label>
            </div>
            <div class="inputbox">
            <i class="bi bi-envelope-at form-icon"></i>
              <input type="email" placeholder=" " required>
              <label for="">Email</label>
            </div>
            <div class="inputbox">
              <i class="bi bi-lock form-icon"></i>
              <input type="password" placeholder=" " required>
              <label for="">Password</label>
            </div>
            <button class="form-button">Register</button>
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
    name: 'RegisterView'
  }
</script>
  
<style src="@/assets/css/forms.css"></style>
