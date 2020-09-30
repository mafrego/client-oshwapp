<template>
  <div class="font text-justify">
    <br />
    <h1>Write yourproject-bom.csv file</h1>
    <br />
    <h2>1st option: generate a BOM on the app</h2>
    <ol>
      <li>create a project</li>
      <li>
        open the BOM panel with the "update BOM" button and then "add atom"
      </li>
      <li>
        you can also export your BOM as .csv file with the "generate bom.csv"
      </li>
    </ol>
    <br />
    <h2>2nd option: upload an external .csv file</h2>
    <ol>
      <li>
        use a spreadsheet (e.g.
        <a href="https://www.libreoffice.org/discover/calc/" target="_blank"
          >LibreOffice Calc</a
        >)
      </li>
      <li>
        open
        <a
          href="https://github.com/mafrego/docs-oshwapp/blob/master/template/bom/bomTemplate.ods"
          target="_blank"
          >this</a
        >
        bom template (in G2 cell there is already a function that calculate
        totalCost automatically once moq, quantity and unitCost cells are filled
        up)
      </li>
      <li>
        fill up the cells according to the
        <router-link :to="{ name: 'bomprotocol' }" target="_blank"
          >BOM protocol</router-link
        >
      </li>
      <li>Attention: commas and semicolons are forbidden!</li>
      <li>save the BOM both as spreadsheet and .csv file</li>
      <li>
        use the
        <v-btn
          color="grey"
          :to="{ name: 'validate' }"
          target="_blank"
          title="validate bom.csv"
          ><v-icon>done</v-icon></v-btn
        >
        feature to check the validity of yourproject-bom.csv file
      </li>
      <li>
        login, create a project, upload yourproject-bom.csv and start assembling
      </li>
    </ol>
    <br />
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style scoped>
.font {
  font-family: monospace;
}
:any-link {
  text-decoration: none;
}
</style>