<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Rate</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Rate the quote!!</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <div class="text-center">
              <v-rating v-model="rating" background-color="orange lighten-3"
                color="orange"></v-rating>
              </div>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveRating()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['quoteId'],
  data: () => ({
    dialog: false,
    rating: 0,
  }),

  methods: {
    saveRating() {
      this.$store.dispatch('vote', { quoteId: this.quoteId, newVote: this.rating });
      this.dialog = false;
    },
  },
};
</script>
