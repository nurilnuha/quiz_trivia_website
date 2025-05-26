<template>
  <div class="container py-4">
    <h1 class="text-center mb-4">Trivia Categories</h1>

    <div v-if="categories.length" class="row justify-content-center">
      <div
        v-for="category in categories"
        :key="category.id"
        class="col-md-4 mb-3">

        <div class="card h-100 shadow-sm border-primary"
          @click="goToQuiz(category.id)"
          style="cursor: pointer;">
          <div class="card-body text-center">
            <h5 class="card-title">{{ category.name }}</h5>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center">Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      questions: [],
      answers: [],
      score : null,
    }
  },
  methods: {
    fetchCategories() {
      fetch('https://opentdb.com/api_category.php')
        .then(res => res.json())
        .then(data => {
          this.categories = data.trivia_categories
        })
    },
    goToQuiz(id) {
      this.$router.push(`/quiz/${id}`)
    }
  },
  mounted() {
    this.fetchCategories()
  }
}
</script>

<style scoped>
    .card:hover {
    background-color: #2f85dc; /* Light gray */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Stronger shadow */
    transform: scale(1.03); /* Slight zoom */
    transition: all 0.3s ease-in-out;
    }
</style>

