<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="notify__wrapper">
          <div class="notify-title">
            <p>Notify App</p>
          </div>
          <div class="notify__content">
            <preloader 
              v-if="loading"
              :width='90'
              :height="90" />
            <notify 
              v-if="!loading"
              :messages="messages" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import notify from '@/components/Notify.vue'
import axios from 'axios'

import preloader from '@/components/UI/Preloader.vue'

export default {
  components:{ notify, preloader, },
  data(){
    return{
      loading: false,
      messages:[],
    }
  },
  mounted(){
    this.getNotify()
  },
  methods:{
    getNotify(){
      this.loading = true
      axios
        .get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
        .then( resp => {
          let res = resp.data.notify;
          this.messages = res;
        })
        .catch(err => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
  }
  .notify__wrapper{
    width: 400px;
    background: #fff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 12px 12px 0 rgba(0,0,0,.1);
  }
  .notify__content{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
  }
</style>