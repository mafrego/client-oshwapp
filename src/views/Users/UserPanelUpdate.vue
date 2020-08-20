<template>
  <div>
    <v-layout column>
      <v-flex xs1>
        <v-text-field v-model="description" :rules="[rules.isDescription]" label="description"></v-text-field>

        <v-btn class="yellow" @click="update()">
          <v-icon>save</v-icon>
        </v-btn>
        <div v-if="this.message" class="ml-2 msg">
          <span class="green--text">{{message}}</span>
        </div>
        <div v-if="error" class="red--text msg ml-2">{{error}}</div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserPanelUpdate",
  data() {
    return {
      message: "",
      error: "",
      rules: {
        required: (value) => !!value || "Required.",
        isDescription: (value) => {
          const pattern = /^[-a-zA-Z0-9 _.]*$/;
          if(value) return pattern.test(value) || "Only alphanumeric, dots, hyphens, underscore chars";
          else return true
        },
        isAlphanumeric: (value) => {
          const pattern = /^[a-zA-Z0-9_]*$/;
          if(value) return pattern.test(value) || "Only alphanumeric, dots, hyphens, underscore chars";
          else return true
        },
        isCurrency: (value) => {
          const pattern = /[A-Z]{3}/;
          if(value) return pattern.test(value) || "only currency ISO 4217";
          else return true
        },
        isURL: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if(value) return pattern.test(value) || "invalid URL";
          else return true
        },
        isPositiveFloat: (value) => {
          const pattern = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
          if(value) return pattern.test(value) || "only positive float";
          else return true
        },
        isPositiveInt: (value) => {
          const pattern = /^[1-9]+[0-9]*$/;
          if(value) return pattern.test(value) || "only positive integers > 0";
          else return true
        },
        isDuration: (value) => {
          const pattern = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;
          if(value) return pattern.test(value) || "only duration ISO 8601";
          else return true
        }
      }
    };
  },
  computed: {
      description: {
        get() {
          return this.$store.state.user.description
        },
        set (value) {
          this.$store.commit('updateUserDescription', value)
        }
      },
  },
  methods: {
    ...mapGetters(["getUser"]),
    ...mapActions(["reviseUser"]),
    async update() {
      // console.log("calling update...")
      try {
        this.message = "";
        this.error = "";
        const response = await this.reviseUser();
        if (response.status === 200) {
          this.message = "user updated";
        } else {
          this.error = "user not updated";
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