<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <drawer :user=user />
      </v-col>
      <v-col cols="8">
       <v-row>
        <v-col>
        <v-card>
          <v-card-title> {{quotes.author}} </v-card-title>
          <v-card-text> "{{quotes.en}}"</v-card-text>
          <v-card-text>
            <div class="text-center">
                <v-rating :value="quotes.rating" readonly background-color="orange lighten-3"
        color="orange"></v-rating>
            <dialogs :quoteId="quotes._id" />
            </div>
          </v-card-text>
        </v-card>
        </v-col>
       </v-row>
      <v-row v-if = "similarQuote">
        <v-col>
        <v-card>
          <v-card-title> {{similarQuote.similar}} </v-card-title>
          <v-card-title> {{similarQuote.quote[0].author}} </v-card-title>
          <v-card-text> "{{similarQuote.quote[0].en}}"</v-card-text>
          <v-card-text>
            <div class="text-center">
                <v-rating
                  :value="similarQuote.quote[0].rating"
                  readonly
                  background-color="orange lighten-3"
                  color="orange">
            </v-rating>
            <dialogs :quoteId="similarQuote.quote[0]._id" />
            </div>
          </v-card-text>
        </v-card>
        </v-col>
       </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Drawer from '../components/Drawer.vue';
import Dialogs from '../components/Dialog.vue';

export default {
  name: 'Home',
  components: {
    Drawer,
    Dialogs,
  },
  created() {
    this.getRandomQuote();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    quotes() {
      return this.$store.state.quotes ? this.$store.state.quotes : { author: '', en: '', rating: 0 };
    },
    similarQuote() {
      return this.$store.state.similarQuote ? this.$store.state.similarQuote : null;
    },
  },
  methods: {
    getRandomQuote() {
      this.$store.dispatch('getRandomQuotes', { locale: 'en' });
    },
  },

};
</script>
