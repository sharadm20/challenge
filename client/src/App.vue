<template>
  <v-app>
    <v-app-bar
      app
      color="deep-purple darken-3"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('./assets/Briq_Logo_White.png')"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
        <Menu />

    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
  },
};
</script>
