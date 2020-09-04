<template>
<div class="font">
    <br>
    <h1>Glossary</h1>
<p>
    <ul>
        <li><span class="bold">BOM</span>:= bill of <span class="bold">material</span>s</li>
        <li><span class="bold">material</span>:=  <span class="bold">atom</span></li>
        <li><span class="bold">atom</span>:=  <span class="bold">relevant product</span> 
        that cannot be disassembled and that must not be processed or manufactured</li>
        <li><span class="bold">product</span>:=  <span class="bold">object</span> seen as a whole</li>
        <li><span class="bold">relevant</span>:= long-lasting
         (e.g. lubrificating oil is a <span class="bold">relevant product</span> in the <span class="bold">BOM</span> of a car engine while petrol is not)</li>
        <li><span class="bold">assembly</span>:=  <span class="bold">product</span> assembled from different <span class="bold">product</span>s</li>
        <li><span class="bold">object</span>:= something processed or manufactered</li>
    </ul> <br>
    According to these definitions:
    <ol>
        <li><span class="bold">atom</span>s and <span class="bold">assembli</span>es are both <span class="bold">product</span>s</li>
        <li><span class="bold">BOM</span> is a list of <span class="bold">atom</span>s
        (e.g. the list of the content of any LEGO or IKEA box is a <span class="bold">BOM</span>)</li>
        <li><span class="bold">BOM</span> is the list of the parts of a <span class="bold">product</span> that is ready to assemble</li>
    </ol>
</p>
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
.bold {
    font-weight: bold;
}
/* .valid {
    color: green;
}
.invalid {
    color: red;
} */
</style>