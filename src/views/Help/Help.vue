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
          <v-icon>list</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="HOW-TO" @click="toggleHowToComponent">
          <v-icon>build</v-icon>
        </v-btn>
      </div>

      <!-- <div>
        <v-btn class="grey mt-1 ml-2" title="images" @click="toggleImagesComponent">
          <v-icon>photo_camera</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="assemble" @click="toggleAssembleComponent">
          <v-icon>construction</v-icon>
        </v-btn>
      </div> -->

      <div>
        <v-btn class="grey mt-1 ml-2" title="video tutorial" @click="toggleVideoComponent">
          <v-icon>video_settings</v-icon>
        </v-btn>
      </div>

      <!-- <div>
        <v-btn class="grey mt-1 ml-2" title="about" @click="toggleComponent">
          <v-icon>settings</v-icon>
        </v-btn>
      </div> -->

      <div>
        <v-btn class="grey mt-1 ml-2" title="FAQs" @click="toggleFAQComponent">
          <v-icon>question_answer</v-icon>
        </v-btn>
      </div>

    </v-toolbar-items>

      <help-colors v-if="showColorsComponent" />
      <help-glossary v-if="showGlossaryComponent" />
      <help-bom v-if="showBOMComponent" />
      <help-how-to v-if="showHowToComponent" />
      <!-- <help-images v-if="showImagesComponent" />
      <help-assemble v-if="showAssembleComponent" /> -->
      <help-video v-if="showVideoComponent" />
      <help-faq v-if="showFAQComponent" />

  </panel>
  <!-- <div>
          for improvement and suggestion: link to contact 
      </li>
      <li>take and upload images</li>
      <li>standard images: size, format and background</li>
      <li>take pictures with freecad: manual option and using macros</li>
      <li>start assembling</li>
      <li>video tutorial: myHouse showing all steps from bom to released project</li>
      <li>links to git repos</li>
      <li>contact</li>
    </ul>
  </div>-->
</template>

<script>
import HelpColors from './HelpColors'
import HelpGlossary from './HelpGlossary'
import HelpBom from './HelpBom'
import HelpHowTo from './HelpHowTo'
// import HelpImages from './HelpImages'
// import HelpAssemble from './HelpAssemble'
import HelpVideo from './HelpVideo'
import HelpFaq from './HelpFAQ'

export default {
  name: "Help",
  components: {
    HelpColors,
    HelpGlossary,
    HelpBom,
    HelpHowTo,
    // HelpImages,
    // HelpAssemble,
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
      // showAssembleComponent: false,
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
    // toggleAssembleComponent() {
    //   this.showAssembleComponent = !this.showAssembleComponent;
    // },
    toggleVideoComponent() {
      this.showVideoComponent = !this.showVideoComponent;
    },
    toggleFAQComponent() {
      this.showFAQComponent = !this.showFAQComponent;
    },
  }
};
</script>