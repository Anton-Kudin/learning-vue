<template>
  <div class="new-note">
    <label>Заголовок</label>
    <input v-model='note.title' type="text">
    <label>Приоритет задачи</label>
    <select v-model="note.priority">
      <option disabled value="">Выберите приоритет задачи</option>
      <option value="default">Обычная</option>
      <option value="important">Важная</option>
      <option value="rush">Срочная</option>
      
    </select>
    <label>Описание</label>
    <textarea v-model='note.descr'></textarea>
    
    <button class="btn btnPrimary" @click='addNote'>Новая заметка</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props:{
    note:{
      type: Object,
      required: true,
    }
  },
  methods:{
    addNote(){
      this.$emit('addNote', this.note);
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-note{
    text-align: center;
  }
  select{
    width: 100%;
    padding: 16px 26px;
    border-radius: 20px;
    background: #fff;
    margin-bottom: 15px;
  }
</style>