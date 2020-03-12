<template>
  <section class="new-post">
    <div class="container">
      <form action="" @submit.prevent="onSubmit">
        <AppInput v-model="post.title">Заголовок:</AppInput>
        <AppInput v-model="post.descr">Краткое описание:</AppInput>
        <AppInput v-model="post.img">Ссылка на кратинку:</AppInput>
        <AppTextarea v-model="post.content">Текст:</AppTextarea>
        <div class="controls">
          <div @click="cancel" class=" btn btnWhite"> Отмена </div>
          <AppButton>Сохранить</AppButton>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  props:{
    postEdit:{
      type: Object,
      required: false
    }
  },
  data(){
    return{
      post: this.postEdit ? { ...this.postEdit } : {
        title: '',
        descr: '',
        img: '',
        content: '',
      }
    }
  },
  methods:{
    cancel(){
      this.$router.push('/admin/')
    },
    onSubmit(){
      this.$emit('submit', this.post);
    }
  }
}
</script>
<style scoped>
  .controls{
    text-align: center;
    margin: 20px 0;
  }
</style>