<template>
  <div>
    <todos></todos>
  </div>
</template>

<script>
  import Todos from '~/components/Todos';

  export default {
    fetch({ store }) {
      return store.dispatch('loadTodos');
    },
    components: {
      Todos,
    },
  };
</script>
