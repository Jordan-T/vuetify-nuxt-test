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

    <v-progress-linear height="2" style="margin: 0 0 -2px" :indeterminate="true" v-if="todosLoading"></v-progress-linear>

    <v-todo :todo="todo" v-for="todo in allTodos" :key="todo.id"></v-todo>

    <!--<v-list subheader>
      <v-list-tile v-for="todo in allTodos" :key="todo.id">
        <v-list-tile-avatar>

        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{todo.title}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-container>
            <v-layout>
              <v-flex>
                <v-btn flat icon @click.prevent="toggleTodo({ todo })">
                  <v-icon v-if="todo.completed">check_box</v-icon>
                  <v-icon v-else>check_box_outline_blank</v-icon>
                </v-btn>
              </v-flex>
              <v-flex>
                <v-btn flat icon @click.prevent="removeTodo({ todo })">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>

        </v-list-tile-action>
      </v-list-tile>
    </v-list>-->

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import VTodo from './Todo';

  export default {
    data() {
      return {
        newTodoTitle: '',
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
        todosLoading: 'todosLoading',
      }),
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

