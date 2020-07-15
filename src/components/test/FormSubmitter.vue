<template>
  <div>
    <form @submit.prevent="handleSubmitAsync" v-if="asyncTest">
      <input v-model="username" data-username />
      <input type="submit" />
    </form>
    <form @submit.prevent="handleSubmit">
      <input v-model="username" data-username />
      <input type="submit" />
    </form>

    <div class="message" v-if="submitted">Thank you for your submission, {{ username }}.</div>
  </div>
</template>

<script>
export default {
  name: "FormSubmitter",

  data() {
    return {
      username: "",
      submitted: false
    };
  },

  methods: {
    handleSubmit() {
      this.submitted = true;
    },
    handleSubmitAsync() {
      return this.$http
        .get("/api/v1/register", { username: this.username })
        .then(() => {
          // show success message, etc
          this.submitted = true;
        })
        .catch(e => {
          // handle error
          throw Error("Something went wrong", e);
        });
    }
  }
};
</script>
