<template>
  <v-app :dark="darkTheme">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile 
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn 
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-content>
        <v-container>
          <v-alert
              :color="alert.color"
              :icon="alert.icon"
              :dismissible="alert.dismissible"
              :value="alert.showed"
              v-for="(alert, index) in alerts"
              :key="index"
              @input="onHideAlert(alert)"
          >{{ alert.text }}</v-alert>
          <nuxt />
        </v-container>
      </v-content>
    </main>
    <v-navigation-drawer
      temporary
      right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile
            :router="item.to"
            @click.prevent="(typeof item.click === 'function') ? item.click($event) : ''"
            :to="item.to"
            :key="i"
            v-for="(item, i) in rightItems"
            exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        darkTheme: true,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
          { icon: 'list', title: 'Todos', to: '/todos' },
        ],
        rightItems: [
          { icon: 'dashboard', title: 'Dashboard', to: '/dashboard' },
          { icon: 'settings', title: 'Settings', to: '/settings' },
          { icon: 'exit_to_app', title: 'Logout', to: '/logout' },
          { icon: 'invert_colors', title: 'Toggle dark', click: () => { this.darkTheme = !this.darkTheme; } },
        ],
        miniVariant: false,
        rightDrawer: false,
        title: 'Vuetify.js',
      };
    },
    computed: {
      ...mapGetters({
        alerts: 'allAlerts',
      }),
    },
    methods: {
      ...mapActions({
        showAlert: 'showAlert',
        removeAlert: 'removeAlert',
        addAlert: 'addAlert',
      }),
      onHideAlert(alert) {
        this.removeAlert({ alert });
      },
    },
  };
</script>
