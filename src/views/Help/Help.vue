<template>
  <panel>
    <v-toolbar-items slot="action">

      <div>
        <v-btn class="grey mt-1 ml-2" title="colors" @click="toggleColorsComponent">
          <v-icon>palette</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="glossary" @click="toggleGlossaryComponent">
          <v-icon>sort_by_alpha</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="BOM protocol" @click="toggleBOMComponent">
          <!-- <v-icon>list</v-icon> -->  
          <span class="font-weight-bold">BOM</span>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="HOW-TO" @click="toggleHowToComponent">
          <v-icon>build</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="video tutorial" @click="toggleVideoComponent">
          <v-icon>video_settings</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="contact-about" @click="toggleContactComponent">
          <v-icon>contact_page</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="FAQs" @click="toggleFAQComponent">
          <v-icon>question_answer</v-icon>
        </v-btn>
      </div>

    </v-toolbar-items>

      <help-colors v-if="showColorsComponent" />
      <help-glossary v-if="showGlossaryComponent" />
      <help-bom-protocol v-if="showBOMComponent" />
      <help-how-to v-if="showHowToComponent" />
      <help-video v-if="showVideoComponent" />
      <help-contact v-if="showContactComponent" />
      <help-faq v-if="showFAQComponent" />

  </panel>
</template>

<script>
import HelpColors from './HelpColors'
import HelpGlossary from './HelpGlossary'
import HelpBomProtocol from './HelpBomProtocol'
import HelpHowTo from './HelpHowTo'
// import HelpImages from './HelpImages'
import HelpContact from './HelpContact'
import HelpVideo from './HelpVideo'
import HelpFaq from './HelpFAQ'

export default {
  name: "Help",
  components: {
    HelpColors,
    HelpGlossary,
    HelpBomProtocol,
    HelpHowTo,
    // HelpImages,
    HelpContact,
    HelpVideo,
    HelpFaq,
  },
  data() {
    return {
      mode: process.env.NODE_ENV,
      title: process.env.VUE_APP_TITLE,
      showColorsComponent: false,
      showGlossaryComponent: false,
      showBOMComponent: false,
      showHowToComponent: false,
      // showImagesComponent: false,
      showContactComponent: false,
      showVideoComponent: false,
      showFAQComponent: false,
    };
  },
  methods: {
    toggleColorsComponent() {
      this.showColorsComponent = !this.showColorsComponent;
    },
    toggleGlossaryComponent() {
      this.showGlossaryComponent = !this.showGlossaryComponent;
    },
    toggleBOMComponent() {
      this.showBOMComponent = !this.showBOMComponent;
    },
    toggleHowToComponent() {
      this.showHowToComponent = !this.showHowToComponent;
    },
    // toggleImagesComponent() {
    //   this.showImagesComponent = !this.showImagesComponent;
    // },
    toggleContactComponent() {
      this.showContactComponent = !this.showContactComponent;
    },
    toggleVideoComponent() {
      this.showVideoComponent = !this.showVideoComponent;
    },
    toggleFAQComponent() {
      this.showFAQComponent = !this.showFAQComponent;
    },
  }
};
</script>