<template>
  <div class="font text-justify">
    <h1>Prepare atom and assembly images</h1>
    <br />
    <ol>
      <li>
        Images corresponding atoms and assemblies are recommended but not required.
      </li>
      <li>
        The fastest way to save atom images is using CAD macros (e.g.
        <a
          href="https://github.com/mafrego/docs-oshwapp/blob/master/template/cad/picture.FCMacro"
          target="_blank"
        >macro</a>
        working on
        <a href="https://www.freecadweb.org/" target="_blank">FreeCAD</a>
        for taking pictures of all atoms
        of
        <a
          href="https://github.com/machineagency/jubilee/tree/master/frame/cads/STEP"
          target="_blank"
        >Jubilee</a> 3d printer).
      </li>
      <li>
        Image filename shall be an alphanumeric string comprehensive of 62 characters
        plus underscores and hyphens (corresponding regex: ^[-0-9a-zA-Z_]+$).
      </li>
      <li>Blank spaces are not allowed.</li>
      <li>
        Image file shall have
        <span class="bold">exactly the same name</span> as the one of the respective
        atom or assembly.
      </li>
      <li>Image filenames and atoms/assemblies name are case sensitive.</li>
      <li>Allowed file extensions: .svg .png .jpeg .jpg.</li>
      <li>Example: atom name "aB-c_D_1x2x3", respective image file name "aB-c_D_1x2x3.png".</li>
      <li>Maximum file size is 70kB (e.g. a 256x256 image).</li>
      <li>
        For better visualization transparent background is recommended
        (e.g.
        <a
          href="https://github.com/mafrego/docs-oshwapp/tree/master/template/images"
          target="_blank"
        >pictures</a> of Jubilee atoms and assemblies).
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "HelpHowToImages",
};
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