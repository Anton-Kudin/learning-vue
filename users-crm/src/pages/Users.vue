<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <p>debug: sort: {{ currentSort }}, dir: {{ currentSortdir }}, page: {{ page.current }} length: {{ page.length }}</p>
        <table>
          <thead>
            <tr>
              <th @click="sort('name')">Name &#8595;</th>
              <th @click="sort('age')">Age &#8595;</th>
              <th @click="sort('gender')" >Gender &#8595;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usersSort" :key="user.id">
              <td> 
                <img :src="user.img" :alt="user.name">
                <span>{{ user.name }}</span> 
              </td>
              <td> {{ user.age }} </td>
              <td> {{ user.gender }} </td>
            </tr>
          </tbody>
        </table>

        
      </div>
    </section>
    <section>
      <div class="container">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage">Prev</div>
          <div class="btn btnPrimary" @click="nextPage">Next</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

  export default{
    data(){
      return{
        users:[],
        currentSort: 'name',
        currentSortdir: 'asc',
        page:{
          current: 1,
          length: 3,
        }
      }
    },
    created(){
      axios.get('http://api.myjson.com/bins/rzgya')
        .then((response) => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    computed: {
      usersSort(){
        return this.users.sort((a,b) => {
          let mod = 1;
          if(this.currentSortdir === 'desc') mod = -1
          if(a[this.currentSort] < b[this.currentSort]) return -1*mod
          if(a[this.currentSort] > b[this.currentSort]) return 1*mod
          return 0
        }).filter((row, index) => {
          let start = (this.page.current-1) * this.page.length;
          let end = this.page.current * this.page.length;
          if(index>= start && index < end) return true
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
      prevPage(){
        if(this.page.current > 1){
          this.page.current -=1
        }
      },
      nextPage(){
        if(this.page.current * this.page.length < this.users.length){
          this.page.current +=1
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  img{
    width: 60px;
    height: auto;
    border-radius: 50%;
    margin-right: 16px;
  }
  .button-list{
    text-align: center;
    .btn{
      margin: 0 20px;
    }
  }

</style>