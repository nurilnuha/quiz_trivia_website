<template>
  <div>
    <h1>Vue Two-Way Binding Example</h1>

    <h6>{{ greeting }}, {{ name  }}!</h6>

    <input type="text" v-model="name" placeholder="Enter your name" />

    <p v-if="name">
      Your name has <strong>{{ name.length }}</strong> characters.
    </p>
    <p v-else>
      <em>Please enter your name above.</em>
    </p>

    <button @click="clearName()">Clear</button>
    <button @click="uppercaseName()" :disabled="!name">Uppercase</button>
  </div>
</template>


<script>
/* eslint-disable */
export default {
  data() {
    return {
      name: "Reena",
      greeting: "",
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
