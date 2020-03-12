<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section class="auth">
      <div class="container">
        <form @submit.prevent="onSubmit" class="auth__form" action="">
          <AppInput type="email" v-model="user.email"> Логин: </AppInput>
          <AppInput type="password" v-model="user.password "> Пароль: </AppInput>
          <div class="controls">
            <AppButton> Войти! </AppButton>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
export default {

  data() {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch('authUser', this.user)
        .then(res => {
          console.log(res, 3333);
          
        })
        .catch(e => {
          console.log(e, 222);
        })
      this.user.email = '';
      this.user.password = '';
    }
  }
}
</script>

<style lang="scss">
  .auth{

    text-align: center;
  }
  .auth__form{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70vh;
    flex-direction:column;
    
    input{
      min-width: 460px;
    }
  }
</style>
