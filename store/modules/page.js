import * as types from '../mutation-types';

const baseState = {
  loading: false,
  alerts: [
    // {
    //   text: 'lorem ipsum',
    //   color: 'warning',
    //   icon: 'priority_high',
    //   dismissible: true,
    //   showed: true,
    // },
  ],
};

const getters = {
  isLoading: state => state.loading,
  allAlerts: state => state.alerts,
};

const actions = {
  addAlert({ commit }, { alert }) {
    const newAlert = alert;

    if (alert.icon === undefined) {
      switch (alert.color) {
        case 'warning':
          newAlert.icon = 'priority_high';
          break;
        case 'success':
          newAlert.icon = 'check_circle';
          break;
        case 'error':
          newAlert.icon = 'warning';
          break;
        case 'info':
        default:
          newAlert.icon = 'info';
          break;
      }
    }

    newAlert.dismissible = alert.dismissible !== false;
    newAlert.showed = alert.showed !== false;

    commit(types.ADD_ALERT, { alert: newAlert });
  },
  showAlert({ commit }, { alert, showed }) {
    commit(types.SHOW_ALERT, { alert, showed });
  },
  removeAlert({ commit }, { alert }) {
    commit(types.REMOVE_ALERT, { alert });
  },
};

const mutations = {
  [types.SET_LOADING]: (state, { loading }) => {
    state.loading = loading;
  },
  [types.ADD_ALERT]: (state, { alert }) => {
    state.alerts.push(alert);
  },
  [types.REMOVE_ALERT]: (state, { alert }) => {
    state.alerts.splice(state.alerts.indexOf(alert), 1);
  },
  [types.SHOW_ALERT]: (state, { alert, showed }) => {
    // eslint-disable-next-line no-param-reassign
    alert.showed = showed;
  },
};

export default {
  state: () => baseState,
  getters,
  actions,
  mutations,
};
