<template>
<div class="wrapper-content wrapper-content--fixed">
  <section class="about">
    <div class="container">
      <h1 class="title">О моем блоге</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, natus.</p>
      <no-ssr>
        <Intro title="Lorem Ipsum" />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, natus.</p>
      </no-ssr>
      <img src="@/assets/img/about.jpg" alt="about">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, natus.</p>
    </div>
  </section>
</div>

</template>

<script>
export default {
  head(){
    let title = 'Мой блог - О блоге',
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

<style lang="scss">
.about{
  text-align: center;
  p{
    margin-bottom: 10px;
  }
}
</style>
