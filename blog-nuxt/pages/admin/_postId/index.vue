<template>
  <newPostForm :postEdit="post" @submit="onSubmit"/>
</template>
<script>
import axios from 'axios';

import newPostForm from '@/components/Admin/NewPostForm.vue'
export default {
  components:{newPostForm},
  layout: 'admin',
  asyncData (contex) {
    return axios.get(`https://blog-nuxt-8043b.firebaseio.com/posts/${contex.params.postId}.json`)
      .then(res=>{
        return{
          post:{...res.data, id: contex.params.postId}
        }
      })
  },
  methods:{
    onSubmit(post){
      this.$store.dispatch('editPost', post)
        .then(() => {
          this.$router.push('/admin');
        })
    }
  }
}
</script>