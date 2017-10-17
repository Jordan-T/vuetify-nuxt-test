import Vue from 'vue';
import Vuex from 'vuex';
import todos from './modules/todos';
import page from './modules/page';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const originalState = () => ({
  sidebar: false,
});

const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
};


const createStore = () => new Vuex.Store({
  state: originalState,
  mutations,
  modules: {
    todos,
    page,
  },
  strict: debug,
});


export default createStore;
