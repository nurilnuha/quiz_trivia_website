<template>
  <div class = "m-4 border">
    <h1>Vue Two-Way Binding Example</h1>

    <h6>{{ greeting }}, {{ name }}!</h6>

    /* v-model to access the value*/
    <input type="text" v-model="name" placeholder="Enter your name" />

    <p v-if="name">
      Your name has <strong>{{ name.length }}</strong> characters.
    </p>
    <p v-else>
      <em>Please enter your name above.</em>
    </p>

    <button @click="clearName()">Clear</button>
    <button @click="uppercaseName()" :disabled="!name">Uppercase</button>

    <li v-for="(value, key) in books" :key="key">{{ value.title }}</li>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'DataTable',
  data() {
    return {
      name: "Jane Austen",
      greeting: "",
      books:[{title:'Sense and Sensibility'},{title:'Pride and Prejudice'},{title:'Lady Susan'}]
    };
  },
  methods: {
    clearName() {
      this.name = "";
    },
    uppercaseName() {
      this.name = this.name.toUpperCase();
    },
    setGreeting() {
      const hour = new Date().getHours();
      if (hour < 12) this.greeting = "Good morning";
      else if (hour < 18) this.greeting = "Good afternoon";
      else this.greeting = "Good evening";
    },
  },
  beforeCreate() {
    console.log("beforeCreate: Data is not yet available.");
  },
  created() {
    console.log("created: Component is created. You can access data now.");
    this.setGreeting();
  },
  mounted() {
    console.log("mounted: Component is mounted in the DOM.");
  },
};
</script>
