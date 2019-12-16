<template>
  <div class="header">
    <h1 class="header__title">
      Приложение "Мои заметки"
    </h1>
    <div class="header__links">
      <a href="#" class="header__link" :class="( linkNotes == 'all'? 'active' : '' )"  @click.prevent="linkAll">Заметки</a>
      <a href="" class="header__link" :class="( linkNotes == 'new'? 'active' : '' )" @click.prevent="linkNew">Новая заметка</a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    linkNotes: String,
  },
  methods: {
    linkNew: function() {
      console.log(2);
      this.$emit('link-new');
    },
    linkAll: function() {
      console.log(1);
      this.$emit('link-all');
    }
  },
}
</script>

<style lang='scss' scoped>
  .header{
    padding: 20px 0;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media(min-width: $tableWidth){
      margin-bottom: 50px;
      flex-direction: row;
    }

    &__title{
      font-size: 30px;
      margin-bottom: 15px;
      text-align: center;
      @media(min-width: $tableWidth){
        text-align: left;
        margin-bottom: 0;
      }
    }
    &__link{
      display: inline-block;
      margin-left: 15px;
      font-weight: bold;
      color: #2b2b2b;

      &:hover{
        color: $primary-color;
      }
      
    }
    &__link.active{
      color: $primary-color;
    }
  }
</style>