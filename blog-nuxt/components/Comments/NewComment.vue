<template>
  <section class="new-comment">
    <div class="container">
      <h2 class="title">
        Комментарии
      </h2>
      <Message 
        v-if="message" 
        :message="message"/>
      <form @submit.prevent="onSubmit" class="contact-form">
        <AppInput v-model="comment.name" >Имя:</AppInput>
        <AppTextarea v-model="comment.text">Текст сообщения:</AppTextarea>

        <div class="controls">
          <AppButton>
            Отправить
          </AppButton>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    postId:{
      type: String,
      required: true,
    }
  },
  data(){
    return{
      message: null,
      comment:{
        name:"",
        text:""
      }
    }
  },
  methods:{
    onSubmit(){
      this.$store.dispatch('addComment', {
        postId: this.postId,
        publish: false,
        ...this.comment
      })
        .then(res => {
          this.message="Отправлен";
          this.comment.name = '';
          this.comment.text = '';
        })
        .then(e => console.log(e));
    }
  }
}
</script>
<style lang="scss">
  .new-comment{
    text-align: center;

    .controls{
      margin: 30px;
    }
    .contact-form{
      max-width: 600px;
      margin: 30px auto;
    }
  }
</style>