<template>
<div class="font">
    <br>
    <h1>Write a bom.csv file</h1>
    <h2>Recommendations</h2>
    <br>
    <ul>
            <li>use a spreadsheet: <a href="https://www.libreoffice.org/discover/calc/" target="_blank">LibreOffice Calc</a> preferred</li>
            <li>use <a href="https://github.com/mafrego/docs-oshwapp/blob/master/template/bom/bomTemplate.ods" target="_blank">this</a> bom template:
            notice that in G2 cell there is already a function that calculate totalCost automatically once moq, quantity and unitCost cells are filled up</li>
            <li>fill up the cells according to the <router-link :to="{ name: 'bomprotocol'}" target="_blank">BOM protocol</router-link></li>
            <li>Attention: no commas and semicolons are allowed in the cells!</li>
            <li>save the BOM both as spreadsheet and .csv file</li>
            <li>use the <v-btn color="grey" :to="{ name: 'validate'}" target="_blank" title="validate BOM"><v-icon>done</v-icon></v-btn> feature to check your bom.csv file</li>
    </ul>
    <br>
</div>
</template>

<script>
export default {
name: ""    
}
</script>

<style scoped>
.font {
    font-family: monospace;
}
:any-link {
  text-decoration: none;
}
</style>