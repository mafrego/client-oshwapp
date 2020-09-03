<template>
<div class="font">
    <br>
    <h1>Start assembling</h1>
    <ol>
        <li>LOGIN or REGISTER.</li>
        <li><v-btn class="green mb-1 mr-1" title="create project"><v-icon>add_circle</v-icon></v-btn> Create project.</li>
        <li><v-btn class="yellow mb-1 mr-1" title="update project metadata"><v-icon>update</v-icon></v-btn> Update project (optional).</li>
        <li><v-btn class="blue mb-1 mr-1" title="open project"><v-icon>pageview</v-icon></v-btn> Open project.</li>
        <li><v-btn class="grey mb-1 mr-1" title="validate bom.csv"><v-icon>done</v-icon></v-btn> Validate bom.csv file (optional).</li> 
        <li><v-btn class="green mb-1 mr-1" title="upload BOM"><v-icon>attach_file</v-icon></v-btn> 
         <v-btn class="green mb-1 mr-1" title="upload"><v-icon>cloud_upload</v-icon></v-btn> Select and upload your_project_bom.csv file.</li>
        <li><v-btn class="green mb-1 mr-1" title="select images to upload"><v-icon>add_a_photo</v-icon></v-btn>
        <v-btn class="green mb-1 mr-1" title="upload images"><v-icon>cloud_upload</v-icon></v-btn>
        Select and upload atom images (optional).</li>
        <li><v-btn class="green mb-1 mr-1" title="assemble"><v-icon>handyman</v-icon></v-btn> Open assembling panel.</li>
        <li><v-btn class="green mb-1 mr-1" title="assemble"><v-icon>build</v-icon></v-btn> 
        Choose name, decription and quantity of assembly, then select quantity of products 
        the assembly is made of and assemble them.</li>
        <li><v-btn class="red mb-1 mr-1" title="assemble"><v-icon>construction</v-icon></v-btn> In case of errors disassemble (optional).</li>
        <li><v-btn class="red mb-1 mr-1" title="assemble"><v-icon>delete</v-icon></v-btn> Delete whole project (optional).</li>
    </ol>
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
</style>