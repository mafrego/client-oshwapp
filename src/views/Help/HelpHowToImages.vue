<template>
<div class="font">
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
        <li>Allowed formats: .svg .png .jeg .jpg.</li>
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
</style>