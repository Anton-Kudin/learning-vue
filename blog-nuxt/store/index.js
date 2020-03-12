import axios from 'axios';

export const state = () => ({
  postsLoaded: [],
  token: null,
})

export const mutations = {
  setPosts(state, posts){
    state.postsLoaded = posts
  },
  addPost(state, post){
    state.postsLoaded.push(post)
  },
  editPost(state, postEdit){
    const postIndex = state.postsLoaded.findIndex(post => post.id === postEdit.id);
    state.postsLoaded[postIndex] = postEdit;
  },

  setToken(state, token){
    state.token = token;
  },
  destroyToken(state){
    state.token = null;
  }
}

export const actions = {
  nuxtServerInit({commit}, contex){
    return axios.get('https://blog-nuxt-8043b.firebaseio.com/posts.json')
      .then(res => {
        const postsArray = []
        for( let key in res.data){
          postsArray.push({...res.data[key], id: key})
        }
        commit('setPosts', postsArray)
      })
      .catch(err => {
        console.dir(err);
      })
  },
  authUser({commit}, authData){
    const key = 'AIzaSyBL94tTdtHL_0KTGyBgV__CaJh__VoTi3E';
    return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBL94tTdtHL_0KTGyBgV__CaJh__VoTi3E', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(res => {
        let token = res.data.idToken;
        commit('setToken', token);
        localStorage.setItem('token', token);
        this.$router.push('/admin/');
      })
      .catch(e => console.log(e))
  },
  initAuth({commit}){
    let token = localStorage.getItem('token');
    if(!token){
      return false
    }
    commit('setToken', token);
  },
  logoutUser({commit}){
    commit('destroyToken');
    localStorage.removeItem('token');
  },
  addPost ({commit}, post){
    return axios.post('https://blog-nuxt-8043b.firebaseio.com/posts.json', post)
      .then( res => {
        commit('addPost', {...post, id: res.data.name})
      })
      .catch(err => {
        console.dir(err);
      })
  },
  editPost({ commit }, post){
    return axios.put(`https://blog-nuxt-8043b.firebaseio.com/posts/${post.id}.json`, post)
    .then( res => {
      commit('editPost', post)
    })
    .catch(e => console.log(e))
  },
  addComment({ commit }, comment){
    return axios.post('https://blog-nuxt-8043b.firebaseio.com/comments.json', comment)
      .catch(err => {
        console.dir(err);
      })
  }
}

export const getters = {
  getPostsLoaded(state) {
    return state.postsLoaded
  },
  checkAuthUser(state){
    return state.token != null
  }
}