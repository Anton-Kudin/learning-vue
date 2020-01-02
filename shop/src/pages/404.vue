<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <h1 class="title">Страница не найдена</h1>
        <router-link 
          class="link"
          to="/">
            Вернутся на главную
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
  .wrapper-content{
    display: flex;
    min-height: 80vh;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
</style>