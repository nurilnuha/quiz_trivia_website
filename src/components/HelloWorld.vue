<template>
  <div>
    <h1>Hello World!</h1>
    <b-button @click="changepage()">Router Work Like This</b-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    changepage() {
      this.$router.push({ path: '/NewPage' }); // Navigates to a different route
    },
  },
};
</script>
