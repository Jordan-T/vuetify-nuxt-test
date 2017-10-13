const originalState = () => ({
  sidebar: false,
});

const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
};


export default {
  state: originalState,
  mutations,
};
