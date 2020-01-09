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

        <div class="user" v-if="user">
          <div class="user__avatar">
            <img :src="user.avatar_url" alt="">
          </div>
          <div class="user__content">
            <div class="user__login"><a :href="user.html_url" class="link" target="_blanck">{{ user.login }}</a></div>
            <div class="user__cnt-repos">Репозиториев: {{ getCountRepos() }} </div>
          </div>
        </div>
        <div class="repos__wrapper" v-if="reposBasic">
          <div class="repos__nav">
            <p @click="sort('name')">По репозиторию 
              <span>&#8595;</span> <span>&#8593;</span>
            </p>
            <p @click="sort('stargazers_count')">По звездам 
              <span>&#8595;</span> <span>&#8593;</span>
            </p>
          </div>
          <div class="repos-item" v-for="repo in reposSort" :key="repo.id">
            <div class="repos-info">
              <a class="link" :href="repo.html_url" >{{ repo.name }}</a>
              <span>{{ repo.stargazers_count}} ⭐</span>
            </div>
          </div>
        </div>
        <button 
          class="btn btnPrimary" 
          v-if="repos" @click="loadMore"
          :disabled="maxLength === 0"
          :class="{btnDisabled: maxLength === 0}">
          Загрузить еще
        </button>
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
      repos: null,
      reposOther: null,
      reposBasic: null,
      user: null,
      currentSort: 'name',
      currentSortdir: 'asc',
    }
  },
  computed: {
    maxLength () {
      return this.reposOther.length;
    },
    reposSort(){
      return this.reposBasic.sort((a,b) => {
        let mod = 1;
        if(this.currentSortdir === 'desc') mod = -1
        if(a[this.currentSort] < b[this.currentSort]) return -1*mod
        if(a[this.currentSort] > b[this.currentSort]) return 1*mod
        return 0
      })
    }
  },
  methods:{
    sort(e){
      if(e === this.currentSort){
        console.log(e);
        this.currentSortdir = this.currentSortdir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = e;
    },
    loadMore(){
      let resOther = [...this.reposOther];
      let resBasic = [...this.reposBasic];

      if(this.reposOther.length > 5){
        for(let i=0; i<5; i++){
          resBasic.push(this.reposOther[i]);
          resOther.splice(resOther[i], 1);
        }
        this.reposBasic = [...resBasic];
        this.reposOther = [...resOther];
      } else{
        for(let i=0; i < this.reposOther.length; i++){
          resBasic.push(this.reposOther[i]);
          resOther.splice(resOther[i], 1);
        }
        this.reposBasic = [...resBasic];
        this.reposOther = [...resOther];
      }
    },
    getCountRepos(){
      return this.repos.length;
    },
    getUserAccount() {
      return axios.get(`https://api.github.com/users/${this.search}`);
    },

    getUserPermissions() {
      return axios.get(`https://api.github.com/users/${this.search}/repos`);
    },
    getRepos(){
      axios.all([this.getUserAccount(), this.getUserPermissions()])
          .catch(err => {

            this.error = "Не могу найти этого пользователя"
            this.repos = null,
            this.reposOther = null
            this.reposBasic = null
            this.user = null
          })
        .then(axios.spread((acct, rep) => {
          let repOther = [];
          let repBasic = [];
          // в главный отправить только 5 первых записей
          for(let i=0; i<5; i++){
            repBasic.push(rep.data[i]);
          }
          for(let i=5; i<rep.data.length; i++){
            repOther.push(rep.data[i]);
          }
          this.user = acct.data
          this.repos = rep.data
          this.reposOther = repOther
          this.reposBasic = repBasic
          this.error = null
        })

        )
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
    &.btnDisabled {
      cursor: default;
      opacity: .6;
    }
  }
  .user{
    width: 600px;
    margin: 30px 0;
    display: flex;
    align-items: center;
  }
  .user__avatar{
    width: 50%;
    img{
     width: 100px;
     height: 100px;
     border-radius: 50%; 
    }
  }
  .user__content{
    width: 50%;
  }
  .user__login{
    margin-bottom: 15px;
  }
  .user__cnt-repos{
    white-space: nowrap;
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
  .repos__nav{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    p{
      cursor: pointer;
    }
  }
</style>