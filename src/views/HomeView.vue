<template>
  <div class="navbar search-navbar">
    <div class="container-fluid">
      <form action="" class="d-flex" role="search">
        <input v-bind="query" class="search-input" type="text" placeholder="Search" required>
        <button type="submit" class="btn btn-light search-button">
          <i class="bi bi-search"></i>
          Search
        </button>
      </form>
    </div>
  </div>
  
  <div class="results-section">
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      query: ''
    }
  }
}
</script>

<style src="@/assets/css/home.css"></style>
