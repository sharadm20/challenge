<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          v-on="on"
        >
          <span class="mr-2">Select language</span>
        <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
           <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'English', avatar: "require('../assets/uk.svg')" },
      { title: 'Serbia', avatar: "require('../assets/serbia.svg')" },
    ],
  }),
};
</script>
