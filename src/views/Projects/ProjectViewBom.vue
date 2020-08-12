<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="BOM" v-if="getBom.length">
        <v-toolbar-items slot="action">
          <v-btn
            v-if="getBom.length == getAllProducts.length"
            @click="deleteBom"
            class="cyan ml-2"
            title="delete BOM"
            light
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-toolbar-items>

        <div v-for="atom in getBom" :key="atom.uuid">
          <v-layout>
            <v-flex xs6>
              <div class="atom-name">{{atom.name}}</div>
              <div class="atom-description">{{atom.description}}</div>
              <div class="atom-material">{{atom.material}}</div>
              <!-- <v-btn
                class="cyan"
                :to="{
              name: 'product',
              params: {
                productId: atom.uuid
              } 
              }"
              >View</v-btn>-->
              <v-btn color="blue" class @click="selectAtomDetails(atom.uuid)">Details</v-btn>
              <div v-if="atomDetails === atom.uuid">
                Details!
                <!-- TODO component ProjectViewBomAtomUpdate and pass as props atom   -->
                <v-btn @click="hideDetails" color="grey">hide</v-btn>
              </div>
              <v-btn color="blue" class="ml-2" @click="selectAtomToUpdate(atom.uuid)">update</v-btn>
              <div v-if="atomToUpdate === atom.uuid">
                Update!
                <!-- TODO component ProjectViewBomAtomDetails and pass as props atom   -->
                <v-btn @click="hideUpdate" color="grey">hide</v-btn>
              </div>
              <v-btn
                v-if="atom.quantity === atom.quantity_to_assemble"
                class="ml-2"
                color="red"
                @click="deleteAtom(atom.uuid)"
              >delete</v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="atom-image" :src="atom.imageUrl" />
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AtomService from '@/services/AtomService'

export default {
  name: "ProjectViewBom",
  data() {
    return {
      atomToUpdate: null,
      atomDetails: null,
    };
  },
  computed: {
    ...mapGetters(["getBom", "getProject", "getAllProducts"]),
  },
  methods: {
    ...mapActions(["fetchBom", "fetchAssemblableProducts", "deleteBom", "fetchAllProducts"]),
    selectAtomToUpdate(i) {
      this.atomToUpdate = i;
    },
    hideUpdate() {
      this.atomToUpdate = null;
    },
    selectAtomDetails(i) {
      this.atomDetails = i;
    },
    hideDetails() {
      this.atomDetails = null;
    },
    async deleteAtom(atomID){
      try {
        const ret = await AtomService.delete(atomID)
        // console.log(ret)
        if(ret.status === 200){
        this.fetchBom(this.getProject.uuid);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.fetchBom(this.getProject.uuid);
    this.fetchAllProducts(this.getProject.uuid); //to make sure that size of product array is updated
  },
};
</script>

<style scoped>
.atom-name {
  font-size: 14px;
}
.atom-description {
  font-size: 14px;
}
.atom-material {
  font-size: 24px;
}
.atom-image {
  width: 100px;
  height: 100px;
}
</style>