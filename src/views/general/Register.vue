<template>
  <panel title="Register">
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title primary-title>
        <h1 class="display-1">Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form name="myappform" autocomplete="off">
          <v-text-field
            username="username"
            v-model="username"
            :rules="[rules.required]"
            label="username"
            prepend-icon="mdi-account-circle"
            id="username"
          ></v-text-field>
          <v-text-field
            name="email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="email"
            prepend-icon="mdi-email"
            id="email"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            name="password"
            v-model="password"
            :rules="[rules.required, rules.counter]"
            label="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            id="password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="register">Register</v-btn>
        <!-- <v-spacer></v-spacer>
        <v-btn color="primary">Login</v-btn> -->
      </v-card-actions>
      <p class="red--text ml-10" v-if="error">{{error}}</p>
    </v-card>
  </panel>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      error: null,
      showPassword: false,
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length >= 8 || "Min 8 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    ...mapActions(["setUser", "setToken"]),
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          username: this.username
        });
        if (response) {
          this.setToken(response.data.token);
          this.setUser(response.data.user);
          // this.$store.dispatch("setToken", response.data.token);
          // this.$store.dispatch("setUser", response.data.user);
          this.$router.push({
            name: "projects"
          });
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
