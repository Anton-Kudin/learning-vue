<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <div class="container">
        <mainHeader :linkNotes="linkNotes" @link-all="linkAll" @link-new="linkNew"/>
        <div v-if="linkNotes == 'new'">
          <message v-if="message" :message="message" />
          <newNote :note="note" @addNote="addNote"/>
        </div>
        <div v-if="linkNotes == 'all'">
          <div class="notes-header">
            <div class="notes-header__left">
              <search 
                :value="search" 
                placeholder="Найти заметку" 
                @search="search = $event" />
            </div>
            <div class="notes-header__right">
              <div class="icons">
                <svg :class="{ active: grid }" @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>

                <svg :class="{ active: !grid }" @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
              </div>
            </div>
          </div>

          <notes :notes="notesFilter" :grid="grid" @remove="removeNote"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from '@/components/MainHeader.vue'
import message from '@/components/Message.vue'
import newNote from '@/components/NewNote.vue'
import notes from '@/components/Notes.vue'
import search from '@/components/Search.vue'

export default {
  name: 'app',
  components:{
    message,
    newNote,
    notes,
    search,
    mainHeader,
  },
  data (){
    return{
      linkNotes: 'all',
      message: null,
      grid: true,
      search: '',
      notes: [
        {
          title: 'Длинный предлинный заголовок',
          descr: 'Первая заметка в приложении Первая заметка в приложении Первая заметка в приложении',
          date: new Date(Date.now()).toLocaleString(),
          priority: 'default',
        },
        {
          title: 'Вторая заметка',
          descr: 'Вторая заметка в приложении',
          date: new Date(Date.now()).toLocaleString(),
          priority: 'important',
        },
        {
          title: 'Третья заметка',
          descr: 'Третья заметка в приложении',
          date: new Date(Date.now()).toLocaleString(),
          priority: 'rush',
        },
      ],
      note:{
        title:'',
        descr:'',
        priority: '',
      },
    }
  },
  methods: {
    linkNew(){
      if(this.linkNotes != 'new'){
        this.linkNotes = 'new';
      }
    },
    linkAll(){
      if(this.linkNotes != 'all'){
        this.linkNotes = 'all';
      }
    },
    addNote(){
      
      let {title, descr, priority} = this.note;
      if (title === '') {
        this.message = 'Заголовок не может быть пустым'
        return false;
      }
      if(!priority){
        priority = 'default';
      }
      this.notes.push({
        title,
        descr,
        priority,
        date: new Date(Date.now()).toLocaleString()
      })
      this.note.title = '';
      this.note.descr = '';
      this.note.priority = '';
      this.message = null;
      this.linkNotes = 'all';
    },
    removeNote(index){
      this.notes.splice(index, 1);
    }
  },
  computed:{
    notesFilter(){
      let array = this.notes,
          search = this.search;
      if(!search) return array;
      search = search.trim().toLowerCase();
      array = array.filter(function(item){
        if(item.title.toLowerCase().indexOf(search) !== -1){
          return item;
        }
        
      });
      return array;
    }
  },
}
</script>

<style lang="scss">
.notes-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;

  .notes-header__left{
    flex-grow: 1;
    @media(min-width: $tableWidth){
      flex-grow: 0;
      width: 40%;
    }
  }
  .notes-header__right{
    display: none;
    min-width: 70px;
    @media(min-width: $tableWidth){
      display: block;
    }
  }
  .icons{
    text-align: right;
  }
  svg{
    margin-right: 12px;
    color: #999;
    cursor: pointer;
    &:last-child{
      margin-right: 0;
    }
    &.active{
      color: rgb(32, 68, 165);
    }
  }
}
</style>
