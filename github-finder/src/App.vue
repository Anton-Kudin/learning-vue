<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">Github-Finder</div>

          </div>

        </div>
      </div>
    </header>
    <router-view> </router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{

    }
  }
}
</script>

<style lang="scss">
  .navbar-link.router-link-exact-active{
    color: blue;
  }
</style>
