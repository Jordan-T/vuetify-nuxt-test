<template>
  <v-card>
    <v-card-text>
      <v-layout v-if="editing === false" align-center>
        <v-flex style="flex-grow: 0;">
          <v-btn flat icon @click.prevent="onToggleTodo">
            <v-icon v-if="todo.completed">check_box</v-icon>
            <v-icon v-else>check_box_outline_blank</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          {{todo.title}}
        </v-flex>
        <v-flex style="flex-grow: 0;">
          <v-layout align-center>
            <v-flex>
              <v-btn flat icon @click.prevent="onRemoveTodo">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn flat icon @click.prevent="onShowEdit">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-form v-else @submit.prevent="onEditTodo">
        <v-layout align-center>
          <v-flex>
            <v-text-field
                label="New todo title"
                v-model="newTitle"
                hide-details
                required
            ></v-text-field>
          </v-flex>
          <v-flex style="flex-grow: 0;">
            <v-btn color="primary" :disabled="newTitleValid === false" type="submit">
              Edit
              <v-icon right>edit</v-icon>
            </v-btn>
          </v-flex>
          <v-flex style="flex-grow: 0;">
            <v-btn @click.prevent="onCancel">
              Cancel
              <v-icon right>cancel</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        editing: false,
        newTitle: '',
      };
    },
    computed: {
      newTitleValid() {
        return this.newTitle !== '' && this.newTitle !== this.todo.title;
      },
    },
    methods: {
      ...mapActions({
        editTodo: 'editTodo',
        toggleTodo: 'toggleTodo',
        removeTodo: 'removeTodo',
      }),


      onShowEdit() {
        this.newTitle = this.todo.title;
        this.editing = true;
      },
      onEditTodo() {
        if (this.newTitleValid === true) {
          this.editTodo({ todo: this.todo, title: this.newTitle });
          this.editing = false;
        }
      },
      onCancel() {
        this.editing = false;
      },
      onToggleTodo() {
        this.toggleTodo({ todo: this.todo });
      },
      onRemoveTodo() {
        this.removeTodo({ todo: this.todo });
      },
    },
    props: {
      todo: {
        type: Object,
      },
    },
  };
</script>