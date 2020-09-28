<template>
  <v-container fluid>
    <v-layout row justify-space-between>
      <v-flex sm6>
        <v-text-field
          label="assembly description"
          :rules="[rules.required, rules.isDescription]"
          v-model="description"
          outlined
          dense
          hint="description"
        ></v-text-field>
      </v-flex>
      <v-flex sm5>
        <v-text-field
          label="assembly link"
          :rules="[rules.isHTTP]"
          v-model="link"
          outlined
          dense
          hint="link"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-between>
      <v-flex sm12>
        <v-textarea
          label="assembly instructions"
          :rules="[rules.isDescription]"
          v-model="instruction"
          solo
          dense
          rows="1"
          hint="assembly instructions"
        ></v-textarea>
      </v-flex>
    </v-layout>
      <v-layout wrap justify-space-between>
        <v-flex sm2>
          <v-btn class="yellow" @click="update()" title="save updates">
            <v-icon>save</v-icon>
          </v-btn>
        </v-flex>
        <v-flex sm1>
          <v-progress-circular
            class="ml-10"
            v-if="isLoading"
            :indeterminate="isLoading"
            color="light-blue"
          ></v-progress-circular>
        </v-flex>
        <v-flex sm9>
          <div v-if="this.message" class="ml-2 msg green--text">
            {{ message }}
          </div>
          <div v-if="error" class="red--text msg ml-2">{{ error }}</div>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Blank",
  data() {
    return {
      error: null,
      message: null,
      isLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        isDescription: (value) => {
          const pattern = /^[^,;]*$/;
          if (value)
            return (
              pattern.test(value) || "any char except for commas and semicolons"
            );
          else return true;
        },
        isHTTP: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          if (value) return pattern.test(value) || "Invalid http link";
          else return true;
        },
      },
    };
  },
  methods: {
    ...mapActions(["reviseAssembly"]),
    async update(){
       console.log('hola')
    }
  },
  computed: {
    ...mapGetters(["getAssembly"]),
    description: {
      get() {
        return this.$store.state.projects.assembly.description;
      },
      set(value) {
        this.$store.commit("updateAssemblyDescription", value);
      },
    },
    link: {
      get() {
        return this.$store.state.projects.assembly.link;
      },
      set(value) {
        this.$store.commit("updateAssemblyLink", value);
      },
    },
    instruction: {
      get() {
        return this.$store.state.projects.assembly.instruction;
      },
      set(value) {
        this.$store.commit("updateAssemblyInstruction", value);
      },
    },
  }
};
</script>

<style scoped>
</style>