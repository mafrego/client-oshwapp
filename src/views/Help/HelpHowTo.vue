<template>
  <panel>
    <v-toolbar-items slot="action">

      <div>
        <v-btn class="grey mt-1 ml-2" title="HOW-TO" @click="toggleHowToBomComponent">
          <v-icon>list</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="images" @click="toggleHowToImagesComponent">
          <v-icon>photo_camera</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="assemble" @click="toggleHowToAssembleComponent">
          <v-icon>construction</v-icon>
        </v-btn>
      </div>

    </v-toolbar-items>

      <help-how-to-bom v-if="showHowToBomComponent" />
      <help-how-to-images v-if="showHowToImagesComponent" />
      <help-how-to-assemble v-if="showHowToAssembleComponent" />

  </panel>
</template>

<script>
import HelpHowToBom from './HelpHowToBom'
import HelpHowToImages from './HelpHowToImages'
import HelpHowToAssemble from './HelpHowToAssemble'

export default {
  name: "Help",
  components: {
    HelpHowToBom,
    HelpHowToImages,
    HelpHowToAssemble,
  },
  data() {
    return {
      mode: process.env.NODE_ENV,
      title: process.env.VUE_APP_TITLE,
      showHowToBomComponent: false,
      showHowToImagesComponent: false,
      showHowToAssembleComponent: false,
    };
  },
  methods: {
    toggleHowToBomComponent() {
      this.showHowToBomComponent = !this.showHowToBomComponent;
    },
    toggleHowToImagesComponent() {
      this.showHowToImagesComponent = !this.showHowToImagesComponent;
    },
    toggleHowToAssembleComponent() {
      this.showHowToAssembleComponent = !this.showHowToAssembleComponent;
    },
  }
};
</script>