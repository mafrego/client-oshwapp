<template>
  <div>
    <h3>TODOS</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
    </div>
    <div class="todos" v-if="allFiltered">
      <div v-for="a in allFiltered" :key="a.uuid" 
      v-bind:class="{
         'is-complete': a.completed,
         'priority1': a.priority == 1,
         'priority2': a.priority == 2,
         'priority3': a.priority == 3,
         'priority4': a.priority == 4,
         'priority5': a.priority == 5
      }"
        @dblclick="onDblClick(a)"
        class="todo"
      >
        {{a.title}} <br>
        {{a.description}}
        <v-icon @click="deleteTodo(a.uuid)" class="bin" title="delete">delete</v-icon>
        <v-icon v-if="a.completed" class="done">done_outline</v-icon>
      </div>
    </div>
    <div class="todos" v-if="allFiltered.length == 0">
      <div
        v-for="todo in allTodos"
        :key="todo.uuid"
        v-bind:class="{
         'is-complete': todo.completed,
         'priority1': todo.priority == 1,
         'priority2': todo.priority == 2,
         'priority3': todo.priority == 3,
         'priority4': todo.priority == 4,
         'priority5': todo.priority == 5
         }"
        @dblclick="onDblClick(todo)"
        class="todo"
      >
        {{ todo.title }} <br>
        {{ todo.description }}
        <v-icon @click="deleteTodo(todo.uuid)" class="bin" title="delete">delete</v-icon>
        <v-icon v-if="todo.completed" class="done">done_outline</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TodosList",
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    onDblClick(todo) {
      const updTodo = {
        id: todo.uuid,
        title: todo.title,
        completed: Math.abs(todo.completed - 1)
      };
      this.updateTodo(updTodo);
    },
  },
  computed: { ...mapGetters(["allTodos", "allFiltered"])},
  created() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
select {
  margin-top: 10px;
  padding: 6px;
  border: #41b883 1px solid;
}
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.bin {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.is-complete {
  opacity: 0.5;
}
.done{
  opacity: 1;
}
#not-priority {
  display: none;
}
.hide {
  display: none;
}
.priority1 {
  background: red;
  color: white;
}
.priority2 {
  background: orange;
  color: white;
}
.priority3 {
  background: yellow;
  color: white;
}
.priority4 {
  background: lime;
  color: white;
}
.priority5 {
  background: green;
  color: black;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>