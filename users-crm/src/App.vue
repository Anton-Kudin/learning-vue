<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">USERS-CRM</div>
            <ul class="navbar-list">
              <li class="navbar-item" v-for="link in links" :key="link.title">
                <router-link class='navbar-link' :to="link.url" :title="link.title">
                  {{link.title}}
                </router-link>
              </li>
            </ul>
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
      links:[
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Users',
          url: '/users'
        },
      ]
    }
  }
}
</script>

<style lang="scss">
  .navbar-link.router-link-exact-active{
    color: blue;
  }
</style>
