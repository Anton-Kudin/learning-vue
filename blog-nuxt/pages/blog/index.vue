<template>
<div class="wrapper-content wrapper-content--fixed">
  <Intro title="Мои посты"/>
  <PostsList :posts="postsLoaded"/>
</div>

</template>

<script>
export default {
    head(){
    let title = 'Мой блог - Посты',
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
  },
  computed: {
    postsLoaded(){
      return this.$store.getters.getPostsLoaded
    }
  }
}
</script>

<style>

</style>
