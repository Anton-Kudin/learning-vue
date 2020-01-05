import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Users from './users'

export default new Vuex.Store({
  modules:{
    Users,
  },
  state:{

  }
})