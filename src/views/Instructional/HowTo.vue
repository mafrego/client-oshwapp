<template>
  <panel>
    <v-toolbar-items slot="action">

      <div>
        <v-btn class="grey mt-1 ml-2" title="colors">
          <v-icon>palette</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="glossary">
          <v-icon>sort_by_alpha</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="BOM">
          <v-icon>list</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="images">
          <v-icon>photo_camera</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="assemble">
          <v-icon>construction</v-icon>
        </v-btn>
      </div>

      <div>
        <v-btn class="grey mt-1 ml-2" title="video tutorial">
          <v-icon>video_settings</v-icon>
        </v-btn>
      </div>

      <!-- <div>
        <v-btn class="grey mt-1 ml-2" title="about">
          <v-icon>settings</v-icon>
        </v-btn>
      </div> -->

      <div>
        <v-btn class="grey mt-1 ml-2" title="FAQs">
          <v-icon>question_answer</v-icon>
        </v-btn>
      </div>


    </v-toolbar-items>
  </panel>
  <!-- <div>
    <ul>how-to:
      <li>search</li>
      <li>color and icon explanation: CRUD green, blue, yellow, red, SERVICE-grey and btn system e.g. 
        <v-btn color="grey" title="hide">
          <v-icon>close</v-icon>
        </v-btn>
      </li>
      <li>write and upload a bom</li>
      <li>oshwbp
        <ul>
          <li>language</li>
          <li>system of measurement adopted: metric system SI</li>
          <li>headers camelcase: regex for each one gives allowed chars and explanation</li>
        </ul>
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
export default {
  name: "HowTo",
  data() {
    return {
      mode: process.env.NODE_ENV,
      title: process.env.VUE_APP_TITLE,
      response: "ciao",
    };
  },
};
</script>