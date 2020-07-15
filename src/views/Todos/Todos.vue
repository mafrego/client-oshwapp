<template>
  <div>
    <TodosAdd />
    <TodosFilter />
    <TodosList />
  </div>
</template>

<script>
import TodosList from "./TodosList";
import TodosAdd from "./TodosAdd";
import TodosFilter from "./TodosFilter";

export default {
  name: "Todos",
  components: { TodosList, TodosAdd, TodosFilter }
};
</script>

<style>
</style>