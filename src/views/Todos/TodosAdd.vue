<template>
  <div>
    <h3>ADD TODO</h3>
    <div class="add">
      <input type="text" placeholder="title" label="title" v-model="todo.title" />
      <input type="text" placeholder="description" label="description" v-model="todo.description" />
      <input
        type="number"
        v-model.number="todo.priority"
        :min="1"
        :max="5"
        inline
        controls
        title="priority"
      />
      <v-btn class="cyan ml-2" @click="createTodo">add</v-btn>
      <div class="errors" v-if="this.errors.lenght != 0">{{this.errors[0]}} {{this.errors[1]}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TodosAdd",
  data() {
    return {
      todo: {
        title: "",
        description: "",
        priority: 5,
        completed: 0
      },
      errors: []
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    createTodo() {
      if (this.checkForm()) {
        this.addTodo(this.todo);
      } else {
        console.log("missing entries")
      }
    },
    checkForm() {
      if (this.todo.title && this.todo.description) {
        this.errors = []
        return true;
      }
      this.errors = [];
      if (!this.todo.title) {
        this.errors.push("title required");
      }
      if (!this.todo.description) {
        this.errors.push("description required");
      }
    }
  }
};
</script>

<style>
.errors{
  color: red;
}
</style>