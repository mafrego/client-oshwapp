<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Atom">
        <div v-for="atom in atoms" :key="atom.uuid">
          <v-layout>
            <v-flex xs6>
              <div
                class="atom-name"
                @mouseover="hover = atom.uuid"
                @mouseleave="hover = null"
                @click="fix(atom.uuid)"
              >{{atom.name}}
              </div>

              <v-card
                v-if="hover === atom.uuid || fixed === atom.uuid"
                width="40%"
                outlined
                raised
                dark
                elevation-24
                class="card"
              >
              <v-card-title>
                {{atom.name}}               
                  <v-spacer></v-spacer>
                  <v-btn icon class="grey" x-small @click="fix(null)" title="close">
                    <v-icon>close</v-icon>
                  </v-btn>
              </v-card-title>
                <ul>
                  <li>{{atom.description}}</li>
                  <li>{{atom.unitCost}} {{atom.currency}}</li>
                  <li v-if="atom.GTIN">GTIN: {{atom.GTIN}}</li>
                  <li v-if="atom.SKU">SKU: {{atom.SKU}}</li>
                  <li v-if="atom.vendorUrl">
                    <a :href="atom.vendorUrl" target="_blank">vendor</a>
                  </li>
                  <li v-if="atom.link">
                    <a :href="atom.link" target="_blank">link</a>
                  </li>
                </ul>
              </v-card>
            </v-flex>

            <v-flex xs6>
              <img
                class="atom-image"
                :src="atom.imageUrl"
                @mouseover="hover = atom.uuid"
                @mouseleave="hover = null"
                @click="fix(atom.uuid)"
              />
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AtomService from "@/services/AtomService";

export default {
  data() {
    return {
      atoms: null,
      hover: null,
      fixed: null,
    };
  },
  methods: {
    fix(uuid) {
      this.fixed = uuid;
    },
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.atoms = (await AtomService.index(value)).data;
      },
    },
  },
};
</script>

<style scoped>
img {
  cursor: pointer;
}
.atom-name {
  font-size: 30px;
}
.atom-description {
  font-size: 18px;
}
.atom-material {
  font-size: 24px;
}
.card {
  position: fixed;
  right: 5%;
  top: 15%;
  font-size: 84%;
}
:any-link {
  text-decoration: none;
}
</style>