<template>
  <v-container fluid>
    <v-textarea
      v-model="questionnaire.answer0"
      :rules="[rules.isAlphanumeric]"
      label="What do you like about this app?"
      rows="1"
      solo
      dense
      hint="what do you like about this app?"
    ></v-textarea>
    <v-textarea
      v-model="questionnaire.answer1"
      :rules="[rules.isAlphanumeric]"
      label="What don't you like?"
      rows="1"
      solo
      dense
      hint="what don't you like?"
    ></v-textarea>
    <v-textarea
      v-model="questionnaire.answer2"
      :rules="[rules.isAlphanumeric]"
      label="What would you improve?"
      rows="1"
      solo
      dense
      hint="what would you improve?"
    ></v-textarea>
    <v-textarea
      v-model="questionnaire.answer3"
      :rules="[rules.isAlphanumeric]"
      label="Any other comment, suggestion, criticism, etc.?"
      rows="1"
      solo
      dense
      hint="Any other comment, suggestion, criticism, etc.?"
    ></v-textarea>

    <v-btn class="yellow" @click="update()" title="update questionnaire">
      <v-icon>save</v-icon>
    </v-btn>
    <div v-if="this.message" class="ml-2 msg">
      <span class="green--text">{{ message }}</span>
    </div>
    <div v-if="error" class="red--text msg ml-2">{{ error }}</div>
  </v-container>
</template>

<script>
import UserService from "@/services/UserService.js";
import { mapActions } from "vuex";

export default {
  name: "UserPanelQuestionnaire",
  data() {
    return {
      message: "",
      error: "",
      questionnaire: {},
      rules: {
        isAlphanumeric: (value) => {
          const pattern = /^[^©]{0,200}$/;
          if (value)
            return (
              pattern.test(value) ||
              "Max 200 alphanumeric chars, © not allowed!"
            );
          else return true;
        },
      },
    };
  },
  async mounted() {
    const obj = this.$store.state.user.fills_in.node;
    // shallow copy
    const copied = Object.assign({}, obj);
    this.questionnaire = copied;
  },
  methods: {
    ...mapActions(["setQuestionnaire"]),
    async update() {
      try {
        this.message = "";
        this.error = "";
        this.questionnaire.dateTime = new Date();
        // console.log(this.questionnaire)
        const response = await UserService.updateQuestionnaire(
          this.questionnaire
        );
        if (response.status === 200) {
          this.message = "questionnaire updated";
          this.setQuestionnaire(response.data);
        } else {
          this.error = "questionnaire not updated";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>