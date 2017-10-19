import * as todosApi from '../../api/todos';
import * as types from '../mutation-types';


const todosState = {
  todos: [],
  todosLoading: false,
  todosStatus: 'NO_DATA',
};


const getters = {
  allTodos: state => state.todos,
  allTodosCount: state => getters.allTodos(state).length,
  remainingTodos: state => getters.allTodos(state).filter(todo => todo.completed === false),
  remainingTodosCount: state => getters.remainingTodos(state).length,
  completedTodos: state => getters.allTodos(state).filter(todo => todo.completed === true),
  completedTodosCount: state => getters.completedTodos(state).length,
  todosLoading: state => state.todosLoading,
  todosStatus: state => state.todosStatus,
};


// actions
const actions = {
  loadTodos({ commit, state, dispatch }) {
    if (getters.todosStatus(state) === 'NO_DATA') {
      commit(types.SET_TODOS_LOADING, { loading: true });
      commit(types.SET_TODOS_STATUS, { status: 'RECEIVING' });

      commit(types.SET_TODOS_LOADING, { loading: false });
      return todosApi.getTodos().then((response) => {
        commit(types.SET_TODOS, { todos: response.data });
        commit(types.SET_TODOS_STATUS, { status: 'RECEIVED' });
        commit(types.SET_TODOS_LOADING, { loading: false });
      }).catch(() => {
        dispatch('addAlert', {
          alert: {
            text: 'Error on load todos',
            color: 'error',
          },
        });
        commit(types.SET_TODOS_LOADING, { loading: false });
      });
    }
    return new Promise((resolve) => {
      resolve(getters.allTodos(state));
    });
  },
  addTodo({ commit, dispatch }, { title }) {
    const newTodo = {
      title,
      completed: false,
    };

    commit(types.SET_TODOS_LOADING, { loading: true });
    todosApi.addTodo(newTodo).then((response) => {
      commit(types.ADD_TODO, { todo: response.data });
      commit(types.SET_TODOS_LOADING, { loading: false });
    }).catch(() => {
      dispatch('addAlert', {
        alert: {
          text: `Error on add todo "${title}" please try again`,
          color: 'error',
        },
      });
      commit(types.SET_TODOS_LOADING, { loading: false });
    });
  },
  removeTodo({ commit, dispatch }, { todo }) {
    commit(types.SET_TODOS_LOADING, { loading: true });
    todosApi.removeTodo(todo.id).then(() => {
      commit(types.REMOVE_TODO, { todo });
      commit(types.SET_TODOS_LOADING, { loading: false });
      dispatch('addAlert', {
        alert: {
          text: `todo "${todo.title}" removed`,
          color: 'success',
        },
      });
    });
  },
  toggleTodo({ commit, dispatch }, { todo }) {
    const completed = !todo.completed;
    commit(types.SET_TODOS_LOADING, { loading: true });
    commit(types.TOGGLE_TODO, { todo, completed });
    todosApi.editTodo(todo.id, {
      completed,
    }).then(() => {
      commit(types.SET_TODOS_LOADING, { loading: false });
    }).catch(() => {
      dispatch('addAlert', {
        alert: {
          text: `Error on toggle todo "${todo.title}" please try again`,
          color: 'error',
        },
      });
      commit(types.TOGGLE_TODO, { todo, completed: !completed });
      commit(types.SET_TODOS_LOADING, { loading: false });
    });
  },
  editTodo({ commit, dispatch }, { todo, title }) {
    const oldTitle = todo.title;
    commit(types.SET_TODOS_LOADING, { loading: true });
    commit(types.EDIT_TODO, { todo, title });
    todosApi.editTodo(todo.id, {
      title,
    }).then(() => {
      commit(types.SET_TODOS_LOADING, { loading: false });
    }).catch(() => {
      dispatch('addAlert', {
        alert: {
          text: `Error on change todo "${oldTitle}" to "${title}" please try again`,
          color: 'error',
        },
      });
      commit(types.EDIT_TODO, { todo, title: oldTitle });
      commit(types.SET_TODOS_LOADING, { loading: false });
    });
  },
  toggleAllTodos({ dispatch, state }, { completed }) {
    const todos = getters[(completed === true) ? 'remainingTodos' : 'completedTodos'](state);

    todos.forEach((todo) => {
      dispatch('toggleTodo', { todo });
    });
  },
  clearCompletedTodos({ dispatch, state }) {
    getters.completedTodos(state).forEach((todo) => {
      dispatch('removeTodo', { todo });
    });
  },
};


// mutations
const mutations = {
  [types.SET_TODOS](state, { todos }) {
    state.todos = todos;
  },
  [types.SET_TODOS_LOADING](state, { loading }) {
    state.todosLoading = loading;
  },
  [types.SET_TODOS_STATUS](state, { status }) {
    state.todosStatus = status;
  },
  [types.ADD_TODO](state, { todo }) {
    state.todos.push(todo);
  },
  [types.REMOVE_TODO](state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },
  [types.TOGGLE_TODO](state, { todo, completed }) {
    // eslint-disable-next-line no-param-reassign
    todo.completed = completed;
  },
  [types.EDIT_TODO](state, { todo, title }) {
    // eslint-disable-next-line no-param-reassign
    todo.title = title;
  },
};

export default {
  state: () => todosState,
  getters,
  actions,
  mutations,
};
