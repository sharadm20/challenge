<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <p class="display-1 text--primary">
        Sign-in
      </p>
        <v-row>
            <v-btn v-on:click="login('github')" class="ma-4" large>
                <v-icon left>mdi-github</v-icon>Github
            </v-btn>
        </v-row>
        <v-row>
            <v-btn v-on:click="login('google')" class="ma-4" large>
                <v-icon color="red darken-1" left>mdi-google</v-icon>Google
            </v-btn>
        </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'Login',
  // define methods under the `methods` object
  methods: {
    login(provider) {
      // `this` inside methods points to the Vue instance
      console.log(`Hello   ${this.$store.state.status} !`);
      this.$store.dispatch('login', { provider });
    },
  },
};
</script>
