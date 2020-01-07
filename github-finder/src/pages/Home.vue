<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="error" v-if="error">
          <p>{{error}}</p>
        </div>
        <search 
        :value="search"
        @search="search = $event"
        placeholder="Впишите имя пользователя"/>
        <button 
          v-if="!repos"
          class="btn btnPrimary"
          @click="getRepos">Поиск</button>
        <button 
        v-else
        class="btn btnPrimary"
        @click="getRepos">Опять искать</button>
          <div class="repos__wrapper" v-if="repos">
            <div class="repos-item" v-for="repo in repos" :key="repo.id">
              <div class="repos-info">
                <a class="link" :href="repo.html_url" >{{ repo.name }}</a>
                <span>{{ repo.stargazers_count}} ⭐</span>
              </div>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
 import search from '@/components/Search.vue'
 import axios from 'axios'

export default {
  components: {search},
  data(){
    return{
      search: '',
      error: null,
      repos: null
    }
  },
  methods:{
    getRepos(){
      axios.get(`https://api.github.com/users/${this.search}/repos`)
        .then(res => {
          this.repos = res.data
          this.error = null
        })
        .catch(err => {
          this.error = "Не могу найти этого пользователя"
          this.repos = null
        })
    }
  },
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  button{
    margin-top: 40px;
  }
  .repos__wrapper{
    width: 600px;
    margin: 30px 0;

  }
  .repos-info{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #dbdbdb;
  }
  .error{
    margin-bottom: 20px;
    color: red;
  }
</style>