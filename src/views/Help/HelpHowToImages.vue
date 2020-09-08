<template>
<div class="font text-justify">
    <h1>Prepare atom and assembly images</h1>
    <br>
    <ol>
        <li>If you are not interested in displaying images along with your project you can skip this section.</li>
        <li>The fastest way to save atom images is using CAD macros (e.g. 
         <a href="https://github.com/mafrego/docs-oshwapp/blob/master/template/cad/picture.FCMacro" target="_blank">macro</a>
        working on <a href="https://www.freecadweb.org/" target="_blank">FreeCAD</a> 
        for taking pictures of all atoms
        of <a href="https://github.com/machineagency/jubilee/tree/master/frame/cads/STEP" target="_blank">Jubilee</a> 3d printer).
        </li>
        <li>Image file name has to be an alphanumeric string comprehensive of 62 characters 
            (A-Z+a-z+0-9, case-sensitive) plus underscores and hyphens. Blank spaces not allowed.</li>
        <li>IMPORTANT: image file names have to be <span class="bold">exactly the same</span> as the names of the respective
             atoms/assemblies (e. g. atom name: "aB-c_D_1x2x3", respective image file name: 
             "aB-c_D_1x2x3.png").</li>
        <li>Allowed formats: .svg .png .jpeg .jpg.</li>
        <li>Maximum file size is 70kB (enough for a 256x256 image).</li>
        <li>For better visualization transparent background is recommended
            (e.g. <a href="https://github.com/mafrego/docs-oshwapp/tree/master/template/images" target="_blank">pictures</a> of Jubilee atoms and assemblies).</li>
    </ol>
</div>
</template>

<script>
export default {
name: "HelpHowToImages"    
}
</script>

<style scoped>
.font {
    font-family: monospace;
}
:any-link {
  text-decoration: none;
}
.bold {
    font-weight: bold;
}
</style>