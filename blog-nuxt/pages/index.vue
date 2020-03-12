<template>
<div class="wrapper-content wrapper-content--fixed">
  <promo />
  <Intro title="Мои последние посты"/>
  <PostsList :posts="postsLoaded"/>
  <contacts />
</div>

</template>

<script>
import promo from '@/components/Promo.vue'

import contacts from '@/components/Contacts.vue'

export default {
  components: {
    promo,
    contacts
  },
  // asyncData (contex) {
  //   return new Promise ((resolve, reject)=>{
  //     setTimeout(() => {
  //       resolve({
  //         posts: [
  //           { 
  //             id: 1,
  //             title: '1 post',
  //             descr: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, natus.',
  //             img: 'https://cdn21.img.ria.ru/images/154960/82/1549608248_0:93:433:337_600x0_80_0_0_27e0eb5c66dad54fb001392a98f8a4b2.jpg'
  //           },
  //         ]
  //       })
  //     }, 1500)
  //   })
  //     .then(data=>{
  //       return data
  //     })
  //     .catch(e=>{
  //       contex.error(e)
  //     })
  // },
  computed: {
    postsLoaded(){
      return this.$store.getters.getPostsLoaded
    }
  },
  head(){
    let title = 'Мой блог',
        descr = 'Описание моего блога',
        type = 'site'
    return{
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: descr},
        { hid: 'og:description', name: 'og:description', content: descr},
        { hid: 'og:title', name: 'og:title', content: title},
        { hid: 'og:type', name: 'og:type', content: type},

      ]
    }
  }
}
</script>

<style>

</style>
