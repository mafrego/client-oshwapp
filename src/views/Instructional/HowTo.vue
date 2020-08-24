<template>
  <div>
    <ul>how-to:
      <li>search</li>
      <li>colors: CRUD green, blue, yellow, red, SERVICE-grey and btn system e.g. 
        <v-btn color="grey" title="hide">
          <v-icon>close</v-icon>
        </v-btn>
      </li>
      <li>write and upload a bom</li>
      <li>oshwbp 
        <ul>
          <li>language</li>
          <li>system of measurement adopted: metric system SI</li>
          <li>headers: regex for each one <code>regex example: ^[a-zA-Z0-9]{3}</code></li>
        </ul>
          for improvement and suggestion link to contact 
      </li>
      <li>take and upload images</li>
      <li>standard images: size, format and background</li>
      <li>take pictures with freecad: manual option and using macros</li>
      <li>start assembling</li>
      <li>video tutorial: myHouse showing all steps from bom to released project</li>
      <li>license</li>
      <li>links to git repos</li>
      <li>contact</li>
    </ul>
  </div>
</template>

<script>

export default{
  name: "HowTo",
  data(){
    return {
      mode: process.env.NODE_ENV,
      title: process.env.VUE_APP_TITLE,
      response: "ciao"
    }
  },
}
</script>