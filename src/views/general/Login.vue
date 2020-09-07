<template>
  <panel title="Login">
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title primary-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            name="email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="email"
            prepend-icon="mdi-account-circle"
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
        <!-- <v-btn color="success" @click="register">Register</v-btn>
        <v-spacer></v-spacer>-->
        <v-btn color="primary" @click="login">Login</v-btn>

          <v-progress-circular
            class="ml-10"
            v-if="isUserLoading"
            :indeterminate="isUserLoading"
            color="light-blue"
          ></v-progress-circular>

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
      error: null,
      showPassword: false,
      isUserLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    ...mapActions(["setUser", "setToken"]),
    // ...mapActions('users',[
    //   'setUser',
    //   'setToken'
    // ]),

    async login() {
      try {
        this.isUserLoading = true
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        if (response) {
          this.setToken(response.data.token);
          this.setUser(response.data.user);
          this.isUserLoading =false
          // this.$store.dispatch("setToken", response.data.token);
          // this.$store.dispatch("setUser", response.data.user);
          this.$router.push({
            name: "projects",
          });
        }
      } catch (error) {
        this.isUserLoading = false
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
