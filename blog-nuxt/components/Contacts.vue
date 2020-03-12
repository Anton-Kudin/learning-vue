<template>
  <section class="contact">
    <div class="container">
      <h2 class="title">
        Написать нам!
      </h2>
      <Message 
        v-if="message" 
        :message="message"/>
      <form @submit.prevent="onSubmit" class="contact-form">
        <AppInput v-model="user.name" >Имя:</AppInput>
        <AppInput v-model="user.email" type="email">Email:</AppInput>
        <AppTextarea v-model="user.text">Текст сообщения:</AppTextarea>
        <div class="controls">
          <AppButton btnClass="btnWhite" >
            Отправить
          </AppButton>
        </div>
      </form>
    </div>
  </section>
</template>

<script>

export default {
  data(){
    return{
      message: null,
      user:{
        name:"",
        email:"",
        text:""
      }
    }
  },
  methods:{
    onSubmit(){
      this.message="Отправлен"
      console.log(this.user);
    }
  }
}
</script>
<style lang="scss">
  .contact{
    text-align: center;
    background-color: #5e2bd4;
    color: #fff;
    .title{
      color: #fff;
    }
    .controls{
      margin: 30px;
    }
    .contact-form{
      max-width: 600px;
      margin: 30px auto;
    }
  }
</style>