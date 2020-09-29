<template>
  <div class="font">
    <br />
    <h1>OSHW APP</h1>
    <ul>
      <li>
        <a
          href="https://github.com/mafrego/docs-oshwapp/blob/master/CHANGELOG.md"
          target="_blank"
          ><img src="https://img.shields.io/badge/version-1.6.0-blue" alt=""
        /></a>
      </li>
      <li>
        <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">
          <img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" />
        </a>
      </li>
      <li>
        <span class="bold">Git public repos</span>:
        <ul>
          <li>
            <a
              class="font-weight-bold"
              href="https://github.com/mafrego/docs-oshwapp"
              target="_blank"
              >docs and templates</a
            >
          </li>
          <li>
            <a
              class="font-weight-bold"
              href="https://github.com/mafrego/client-oshwapp"
              target="_blank"
              >client</a
            >: Vue.js
          </li>
          <li>
            <a
              class="font-weight-bold"
              href="https://github.com/mafrego/server-oshwapp"
              target="_blank"
              >server</a
            >: Node.js Express.js
          </li>
        </ul>
      </li>
    </ul>
    <h1>Contact</h1>
    <ul>
      <li>
        <span class="bold">Developer</span>:
        <a href="mailto:marco.fregonese@student.uibk.ac.at">
          marco.fregonese@student.uibk.ac.at
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelpContact",
};
</script>

<style scoped>
.font {
  font-family: monospace;
}
.bold {
  font-weight: bold;
}
:any-link {
  text-decoration: none;
}
/* .valid {
    color: green;
}
.invalid {
    color: red;
} */
</style>