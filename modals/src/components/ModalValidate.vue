<template>
  <modals 
    title="Третье модальное окно"
    @close="$emit('close')">
    <div slot=body>

      <form @submit.prevent="onSubmit">
        <div 
          class="form-item" 
          :class="{errorInput: $v.name.$error}">
          <label for="">Имя</label>
          <p class="errorText" v-if="!$v.name.required">Поле обязательно</p>
          <p class="errorText" v-if="!$v.name.minLength">Имя должжно быть больше {{ $v.name.$params.minLength.min }} символов</p>
          <input 
            v-model="name"
            :class="{error: $v.name.$error}"
            @change="$v.name.$touch()">
        </div>
        <div 
          class="form-item" 
          :class="{errorInput: $v.email.$error}">
          <label for="">Е-маил</label>
          <p class="errorText" v-if="!$v.email.required">Поле обязательно</p>
          <p class="errorText" v-if="!$v.email.email">Е-маил должен быть вида: test@test.ru</p>
          <input 
            v-model="email"
            :class="{error: $v.email.$error}"
            @change="$v.email.$touch()">
        </div>
        <button 
          class="btn btnPrimary">
          Submit
        </button>
      </form>

    </div>
  </modals>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import modals from '@/components/Modal.vue'

export default {
  components:{
    modals,
  },
  data(){
    return{
      email: '',
      name: '',

    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,
    }
  },
  methods:{
    onSubmit(){
      this.$v.$touch()
      if(!this.$v.$invalid){
        const user = {
          name: this.name,
          email: this.email,
        }
        console.log(user);
        this.name = '';
        this.email = '';
        this.$v.$reset();
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="scss">
  .form-item .errorText{
    display: none;
    margin-bottom: 8px;
    font-size: 13px;
    color: red;

  }
  .form-item.errorInput{
    .errorText{
        display: block;
        
    }
  } 
  input.error{
    border-color: red;
  }
</style>