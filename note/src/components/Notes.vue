<template>
  <div class="notes">
    <div 
      v-for='(note, index) in notes' 
      class="note"
      :class="[{ full: !grid }, note.priority]"
      :key='index'>
      <div class="note-header">
        <p v-if="activeNote.index === index && activeNote.content == 'title'">
          <input type="text" v-model="note.title" @keyup.enter="endEditNote(index)">
        </p>
        <p v-else v-on:dblclick="editNote(index, 'title')" >
          {{ note.title }}
        </p>

        <p style="cursor: pointer" @click="removeNote(index)">x</p>
      </div>
      
      <div class="note-body">
        <p v-if="activeNote.index === index && activeNote.content == 'descr'">
          <input type="text" v-model="note.descr" @keyup.enter="endEditNote(index)">
        </p>
        <p v-else v-on:dblclick="editNote(index, 'descr')" >{{ note.descr }}</p>
        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// порядок действий
/**
при клике на заголовок записываем индекс в шоуинпут


 */
export default {
  data(){
    return{
      activeNote: {
        index: null,
        content: '',
      },
    }
  },
  props:{
    notes:{
      type: Array,
      required: true,
    },
    grid:{
      type: Boolean,
      required: true,
    }
  },
  methods: {
    removeNote(index){
      console.log(`note id - ${index} removed`);
      this.$emit('remove', index);
    },
    endEditNote(index){
      if(this.activeNote.content == 'title' && this.notes[index].title == ''){
        this.notes[index].title = 'Заполните заголовок';
      } else if(this.activeNote.content == 'descr' && this.notes[index].descr == ''){
        this.notes[index].descr = 'Заполните описание';
      }
      this.activeNote.index = null;
      this.activeNote.content = '';
      this.notes[index].date = new Date(Date.now()).toLocaleString();
    },
    editNote(index, content){
      this.activeNote.index = index;
      if(content == 'title') this.activeNote.content = 'title';
      if(content == 'descr') this.activeNote.content = 'descr';
    },
  },
  created(){
    document.addEventListener('mousedown', (e) => { 
      if(e.target.tagName !== 'INPUT' && this.activeNote.index != null){
        this.endEditNote(this.activeNote.index);
      };
      
    });
    console.log(this.notes);
  }
}
</script>

<style lang='scss'>
  .notes{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 30px;
  }
  .note{
    width: 100%;
    padding: 18px 20px;
    margin-bottom: 20px;
    background-color: #fff;

    @media(min-width: $tableWidth){
      width: 48%;
    }
    &.full{
      width: 100%;
    }
    &.default{
      border-left: 5px solid #999;
    }
    &.important{
      border-left: 5px solid rgb(219, 168, 0);
    }
    &.rush{
      border-left: 5px solid rgb(133, 38, 38);
    }
    
  }
  .note-header{
    display: flex;
    justify-content: space-between;

    p{
      font-size: 22px;
      line-height: 30px;
      color: rgb(32, 68, 165);
    }
    input{
      margin-bottom: 0;
      padding: 0 10px;
      font-size: 22px;
      line-height: 30px;
    }
  }
  .note-body{
    p{
      margin: 20px 0;
    }
    span{
      font-size: 14px;
      color: #999;
    }
    input{
      margin-bottom: 0;
      padding: 0 10px;
      font-size: 22px;
      line-height: 30px;
    }
  }
</style>