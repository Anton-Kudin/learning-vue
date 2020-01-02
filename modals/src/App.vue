<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <button 
            class="btn btnPrimary"
            @click="modalFirst = !modalFirst">
            Показать первую модалку
          </button>
          <modals 
            title="Превое модальное окно"
            v-show="modalFirst"
            @close="modalFirst = false">
            <div slot=body>
              <p>Текст текст текст</p>
              <button 
                class="btn btnPrimary"
                @click="modalFirst = !modalFirst">
                ОК
              </button>
            </div>
          </modals>

          <button 
            class="btn btnPrimary"
            @click="modalSecond.show = !modalSecond.show">
            Показать вторую модалку
          </button>
          <modals 
            title="Второе модальное окно"
            v-show="modalSecond.show"
            @close="modalSecond.show = false">
            <div slot=body>
              <form @submit.prevent="submitSecondForm">
              <label for="">Имя</label>
              <input type="text" v-model='modalSecond.name'>
              <label for="">E-mail</label>
              <input type="text" v-model='modalSecond.email'>
                <button 
                  class="btn btnPrimary">
                  Submit
                </button>
              </form>

            </div>
          </modals>

          <button 
            class="btn btnPrimary"
            @click="modalValidate = !modalValidate">
            Показать третью модалку
          </button>

          <modalValidate 
            v-show="modalValidate" 
            @close="modalValidate = false" 
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import modals from '@/components/Modal.vue'
import modalValidate from '@/components/ModalValidate.vue'
export default {
  name: 'app',
  components:{
    modals,
    modalValidate
  },
  data(){
    return {
      modalFirst: false,
      modalSecond: {
        show: false,
        name: '',
        email: '',
      },
      modalValidate: false,
    }
  },
  methods:{
    submitSecondForm(){
      console.log({
        name: this.modalSecond.name,
        email: this.modalSecond.email,
      })
      this.modalSecond.name = "";
      this.modalSecond.email = "";
      this.modalSecond.show = false;
    }
  }

}
</script>

<style>

</style>
