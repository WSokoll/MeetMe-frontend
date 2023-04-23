<template>
  <section class="form-section">
    <div class="form-box form-box-login">
      <div class="form-value">
        <form action="">
          <h2 class="form-title">Login</h2>
          <div class="inputbox">
            <i class="bi bi-person form-icon"></i>
            <input type="text" placeholder=" " required>
            <label for="">Username</label>
          </div>
          <div class="inputbox">
            <i class="bi bi-lock form-icon"></i>
            <input type="password" placeholder=" " required>
            <label for="">Password</label>
          </div>
          <button class="form-button">Log in</button>
          <div class="register-link">
            <p>Don't have an account? <router-link to="/register">Register</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginView'
}
</script>

<style src="@/assets/css/forms.css"></style>
