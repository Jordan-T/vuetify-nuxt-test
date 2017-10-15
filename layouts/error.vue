<template>
  <v-app dark>
    <v-layout class="Error">
      <v-flex xs12 sm6 offset-sm3>
        <div class="text-xs-center">
          <img src="/v.png" alt="Vuetify.js" class="mb-5" />
        </div>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ error.statusCode }}</h3>
              <div>{{ error.message }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  v-if="error.statusCode === 404" color="primary" flat nuxt to="/" exact>Go to homepage</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    props: ['error'],
  };
</script>

<style>
  .Error {
    margin-top: 100px;
  }
</style>