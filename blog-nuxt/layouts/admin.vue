<template>
<client-only>
    <div class="wrapper">
    <Header></Header>

    <div class="wrapper-content wrapper-content--fixed">
      <Intro title="Страница админки">
        <nuxt-link to="/admin" class="link linkWhite">Главная</nuxt-link>
        <nuxt-link to="/admin/new-post" class="link linkWhite">Новый пост</nuxt-link>
        <nuxt-link to="/admin/comments" class="link linkWhite">Комментарии</nuxt-link>
        <span @click="logoutUser" class="link linkWhite">Выйти</span>
      </Intro>
      <nuxt />
    </div>
  </div>
</client-only>
</template>

<script>
import Header from '@/components/system/Header.vue'

export default {
  components: { Header },
  middleware: [ 'auth-check', 'auth' ],
  methods: {
    logoutUser(){
      this.$store.dispatch('logoutUser')
        .then(()=>{
          console.log(111);
          this.$router.push('/admin/auth')
        })
    }
  }
}
</script>
<style>

</style>
