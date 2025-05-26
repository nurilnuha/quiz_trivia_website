<template>
  <div class="m-4 border">
    <h1>Trivia Categories</h1>

    <ul v-if="categories.length">
      <li
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        style="cursor: pointer; margin-bottom: 8px"
      >
        {{ category.name }}
      </li>
    </ul>

    <p v-else>Loading categories...</p>

    <div v-if="questions.length">
      <h2>Quiz Questions</h2>
      <ol>
        <li v-for="(question, index) in questions" :key="index">
          <div v-html="question.question"></div>
          <ul>
            <li
              v-for="option in shuffleOptions(question)"
              :key="option"
              @click="selectAnswer(index, option)"
              :style="{
                cursor: 'pointer',
                color: userAnswers[index] === option ? 'blue' : 'black'
              }"
            >
              {{ option }}
            </li>
          </ul>
        </li>
      </ol>
      <button @click="submitAnswers">Submit</button>
    </div>

    <div v-if="score !== null">
      <h3>Your Score: {{ score }}/10</h3>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      categories: [],
      questions: [],
      userAnswers: [],
      score: null,
    };
  },
  methods: {
    fetchCategories() {
      fetch('https://opentdb.com/api_category.php')
        .then(res => res.json())
        .then(data => {
          this.categories = data.trivia_categories;
        });
    },
    selectCategory(categoryId) {
      this.score = null;
      fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
        .then(res => res.json())
        .then(data => {
          this.questions = data.results;
          this.userAnswers = Array(10).fill(null);
        });
    },
    shuffleOptions(question) {
      const options = [...question.incorrect_answers, question.correct_answer];
      return options.sort(() => Math.random() - 0.5);
    },
    selectAnswer(index, answer) {
      this.$set(this.userAnswers, index, answer);
    },
    submitAnswers() {
      this.score = this.questions.reduce((score, question, index) => {
        return score + (this.userAnswers[index] === question.correct_answer ? 1 : 0);
      }, 0);
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>
