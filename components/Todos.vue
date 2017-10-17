<template>
  <div>
    <h1>Todos</h1>

    <v-alert :color="alert.color" :icon="alert.icon" dismissible v-model="alert.showed">
      {{ alert.message }}
    </v-alert>

    <v-form @submit.prevent="addTodo">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex>
            <v-text-field
                label="New todo title"
                v-model="newTodoTitle"
                required
            ></v-text-field>
          </v-flex>
          <v-flex style="flex-grow: 0;">
            <v-btn color="primary" :disabled="newTodoIsValid === false" type="submit">
              Add
              <v-icon right>add_circle</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

    <v-bottom-nav :value="true" :active.sync="category" class="transparent Todos-nav">
      <v-btn flat value="all">
        <span>All</span>
        <v-icon>all_inclusive</v-icon>
      </v-btn>
      <v-btn flat value="remaining">
        <span>Remaining</span>
        <v-icon>check_box_outline_blank</v-icon>
      </v-btn>
      <v-btn flat value="completed">
        <span>Completed</span>
        <v-icon>check_box</v-icon>
      </v-btn>
    </v-bottom-nav>

    <transition name="fade-transition">
      <v-progress-linear height="2" style="margin: 0 0 -2px" :indeterminate="true" v-if="todosLoading"></v-progress-linear>
    </transition>

    <v-todo :todo="todo" v-for="todo in pageTodos" :key="todo.id"></v-todo>

    <div class="text-xs-center mt-3">
      <v-pagination :length="lastPage" v-model="currentPage" :total-visible="7"></v-pagination>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import VTodo from './Todo';

  export default {
    data() {
      return {
        newTodoTitle: '',
        category: 'all',
        itemsPerPage: 5,
        currentPage: 1,
        alert: {
          showed: false,
          message: '',
          color: 'info',
          icon: 'info',
        },
      };
    },
    computed: {
      ...mapGetters({
        allTodos: 'allTodos',
        remainingTodos: 'remainingTodos',
        completedTodos: 'completedTodos',
        todosLoading: 'todosLoading',
      }),
      todos() {
        if (this.category === 'remaining') {
          return this.remainingTodos;
        } else if (this.category === 'completed') {
          return this.completedTodos;
        }
        return this.allTodos;
      },
      pageTodos() {
        if (this.currentPage > this.lastPage) {
          this.currentPage = this.lastPage;
        }
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.todos.slice(start, start + this.itemsPerPage);
      },
      lastPage() {
        return Math.ceil(this.todos.length / this.itemsPerPage);
      },
      newTodoIsValid() {
        return this.newTodoTitle !== '';
      },
    },
    methods: {
      ...mapActions({
        addTodoStore: 'addTodo',
        removeTodoStore: 'removeTodo',
        toggleTodoStore: 'toggleTodo',
      }),
      addTodo() {
        const todoTitle = this.newTodoTitle;
        this.addTodoStore({ title: todoTitle });

        this.alert.showed = false;
        this.alert.message = `New todo added: ${todoTitle}`;
        this.alert.color = 'success';
        this.alert.icon = 'check_circle';
        this.alert.showed = true;

        this.newTodoTitle = '';
      },
      removeTodo({ todo }) {
        this.removeTodoStore({ todo });
      },
      toggleTodo({ todo }) {
        this.toggleTodoStore({ todo });
      },
    },
    components: {
      VTodo,
    },
  };
</script>

<style>
  .Todos-nav {
    position: static !important;
  }
</style>
