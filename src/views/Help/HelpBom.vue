<template>
  <div class="font">
    <br />
    <h1>BOM protocol</h1>
    <br />
    <h2>BOM headers</h2>
    <br />n.
    <span class="bold">headerName</span>: allowed header format, not/required, header description
    <br />
    <br />
    <ol>
      <li>
        <span class="bold">itemNumber</span>: increasing integer starting from 1, required, unique number associated to
      </li>
      <li>
        <span class="bold">name</span>: alphanumerical string with underscores and hyphens allowed, required, unique atom name
      </li>
      <li>
        <span class="bold">description</span>: string including any character except for commas and semicolons, required, brief atom description of its peculiarities
      </li>
      <li>
        <span class="bold">moq</span>: integer equal or greater than 1, required, minimum order quantity
      </li>
      <li>
        <span class="bold">quantity</span>: integer equal or greater than 1, required, number of identical atoms
      </li>
      <li>
        <span class="bold">unitCost</span>: floating point number, required, cost of single atom
      </li>
      <li>
        <span class="bold">totalCost</span>: floating point number, required, sum of cost of all identical atoms if moq equals 1 otherwise unitCost times a multiple of respective moq
      </li>
      <li>
        <span class="bold">currency</span>: 3 capital character length string according to currency designator
        <a
          href="https://en.wikipedia.org/wiki/ISO_4217"
          target="_blank"
        >ISO 4217</a>, required, currency relative to
        <span class="bold">unitCost</span> and
        <span class="bold">unitCost</span>
      </li>
      <li>
        <span class="bold">GTIN</span>: 8, 12, 13, or 14 digit length number, not required,
        <a
          href="https://en.wikipedia.org/wiki/Global_Trade_Item_Number"
          target="_blank"
        >Global Trade Item Number</a>
      </li>
      <li>
        <span class="bold">SKU</span>: any possible string, not required,
        <a
          href="https://en.wikipedia.org/wiki/Stock_keeping_unit"
          target="_blank"
        >Stock Keeping Unit</a>
      </li>
      <li>
        <span class="bold">vendorUrl</span>: URL with HTTP string, required if relative
        <span class="bold">link</span> entry is blank,
        <a
          href="https://en.wikipedia.org/wiki/URL"
          target="_blank"
        >Uniform Resource Locator</a> of atom vendor
      </li>
      <li>
        <span class="bold">leadTime</span>: alphanumerical upper case character string according to
        <a
          href="https://en.wikipedia.org/wiki/ISO_8601#Durations"
          target="_blank"
        >ISO 8601</a>, not required, time required from the placement of an order to arrival of product at your doorstep
      </li>
      <li>
        <span class="bold">link</span>: URL with HTTP string, required if relative
        <span class="bold">vendorUrl</span> entry is blank,
        <a
          href="https://en.wikipedia.org/wiki/URL"
          target="_blank"
        >Uniform Resource Locator</a> of atom if custom made or not for sale
      </li>
      <li>
        <span class="bold">notes</span>: string including any character except for commas and semicolons, not required, text ad libitum
      </li>
    </ol>
    <br />
    <h2>Supported languages</h2>
    <br />
    <p>Any language with Latin-script alphabet, English preferred.</p>
    <br />
    <h2>System of measurement</h2>
    <br />
    <a
      href="https://en.wikipedia.org/wiki/International_System_of_Units"
      target="_blank"
    >metric system SI</a>
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
.bold {
  font-weight: bold;
}
:any-link {
  text-decoration: none;
}
</style>