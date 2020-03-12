<template>
  <section v-if="comments" class="comments">
    <div class="container">
      <h2 class="title">Комментарии</h2>
      <p v-if="comments.length === 0">Комментариев: 0</p>
      <div v-else class="comment" v-for="comment in comments" :key="comment.name">
        <p class="name">{{comment.name}}</p>
        <p class="text">{{comment.text}}</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props:{
    comments:{
      type: Array,
      default: null
    }
  }
}
</script>
<style lang="scss">
  .comments{
    text-align: center;
    max-width: 600px;
    margin: 30px auto;
  }
  .comment{
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;

    .name{
      font-size: 24px;
      color: rgb(23, 13, 163);
      margin-bottom: 12px;
    }
  }
</style>