<template>
  <div class="container py-4">
  <button class="btn btn-secondary mb-3" @click="goBack">
     ← Back to Categories
  </button>
    <h2 class="text-center mb-4">Quiz</h2>
    <div v-if="questions.length">
      <div v-for="(question, index) in questions" :key="index" class="mb-4">
        <div class="card p-3">
          <h5 v-html="decodeHTML(`${index + 1}. ${question.question}`)"></h5>
          <div class="form-check" v-for="option in question.shuffledAnswers" :key="option">
            <input
              class="form-check-input"
              type="radio"
              :name="`question-${index}`"
              :value="option"
              v-model="userAnswers[index]"/>
            <label class="form-check-label" v-html="decodeHTML(option)"></label>
          </div>
        </div>
      </div>

      <button class="btn btn-success mt-4" @click="submitAnswers">Submit Answers</button>
    </div>

    <div v-else class="text-center">
      <p>Loading questions...</p>
    </div>

    <div v-if="score !== null" class="alert alert-info text-center mt-4">
      You scored {{ score }}/10!
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      userAnswers: [],
      score: null,
    };
  },
  methods: {
    fetchQuestions() {
    const categoryId = this.$route.params.id;
    fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
        .then(res => res.json())
        .then(data => {
        this.questions = data.results.map(q => {
            const shuffled = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
            return {
            ...q,
            shuffledAnswers: shuffled
            };
        });
        });
    },
    decodeHTML(html) {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    submitAnswers() {
      let score = 0;
      this.questions.forEach((question, index) => {
        if (this.userAnswers[index] === question.correct_answer) {
          score++;
        }
      });
      this.score = score;
    },
    goBack() {
        this.$router.push('/HomePage');
    }
  },
  mounted() {
    this.fetchQuestions();
  }
};
</script>
