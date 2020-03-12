<template>
  <no-ssr>
    <commentTable :thead="['Имя', 'Текст', 'Статус', 'Поменять статус', 'Удалить']">
      <tbody slot="tbody">
        <tr v-for="comment in comments" :key="comment.id">
          <td><span> {{ comment.name }} </span></td>
          <td><span> {{ comment.text }} </span></td>
          <td>
            <span v-if="comment.publish" class="status true">  
              Опубликовано
            </span>
            <span v-else class="status false">  
              Неопубликовано
            </span>

          </td>
          <td><span @click="changeComment(comment)" class="link"> Выбрать статус </span></td>
          <td><span @click="deleteComment(comment.id)" class="link"> Удалить </span></td>
        </tr>
      </tbody>
    </commentTable>
  </no-ssr>
</template>
<script>
import commentTable from '@/components/Admin/commentTable.vue'
import axios from 'axios';

export default {
  components:{commentTable},
  layout: 'admin',
  data(){
    return{
      comments:[
      ]
    }
  },
  methods:{
    changeComment(comment){

      comment.publish = !comment.publish;
      axios.put(`https://blog-nuxt-8043b.firebaseio.com/comments/${comment.id}.json`, comment)
      console.log(comment);
    },
    deleteComment(id){
      axios.delete(`https://blog-nuxt-8043b.firebaseio.com/comments/${id}.json`)
        .then(res => {
          this.loadComments();
        })
    },

    loadComments(){
      axios.get('https://blog-nuxt-8043b.firebaseio.com/comments.json')
      .then(res => {
        let commentsArray = [];
        Object.keys(res.data).forEach(key => {
          const comment = res.data[key]
          commentsArray.push({...comment, id: key});
        })
        this.comments = commentsArray;
      })
    }
  },
  mounted(){
    this.loadComments()
  }
}
</script>