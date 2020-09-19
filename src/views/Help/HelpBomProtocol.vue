<template>
  <div class="font text-justify">
    <br />
    <h1>OSHW BOM protocol</h1>
    <br />
    <h2>Preliminary notes</h2>
    <br>
    <ul>
      <li>The
        <span class="bold">OSHW BOM protocol</span> defines the headers of a 
        <a href="https://en.wikipedia.org/wiki/Comma-separated_values" target="_blank">comma-separated values</a>  file used as
        <a href="https://en.wikipedia.org/wiki/Bill_of_materials" target="_blank">bill of materials </a> for any open source hardware product.
      </li>
      <li>Header 0. in the "BOM headers" section describes how each succesive header has to be understood.</li>
      <li>
        The protocol follows the
        <a href="https://semver.org/" target="_blank">Semantic Versioning</a> directives.
      </li>
      <li>
        The protocol is still under development: anyone interested in improving it
        can <a href="https://github.com/mafrego/docs-oshwapp/issues" target="_blank">create an issue</a> 
        or write an email to <a href="mailto: marcofregonese@gmail.com">this address</a>.
      </li>
      <li>
        A <a href="https://github.com/mafrego/docs-oshwapp/blob/master/template/bom/miniHouse-bom.csv" target="_blank">working example</a> 
        of BOM file according to the OSHW BOM protocol 0.0.1.
      </li>
    </ul>
    <br>
    <h2>BOM filename</h2>
    <br />
    <ul>
      <li>The file containing the BOM shall begin with the project name followed by "-bom".</li>
      <li>The file extension shall be ".csv".</li>
      <li>Example: "myopensourceproject-bom.csv".</li>
      <li>Filenames are case sensitive and blank spaces are not allowed.</li>
      <li>Filenames are recommended to be lower case.</li>
    </ul>
    <br />
    <h2>BOM headers</h2>
    <br />
    <ol start="0">
      <li>
        <span class="bold">headerName</span>:
        <ul>
          <li>allowed header format</li>
          <li>corresponding regex</li>
          <li>required/recommended</li>
          <li>header description</li>
        </ul>
      </li>
      <br />
      <li>
        <span class="bold">itemNumber</span>:
        <ul>
          <li>increasing integer starting from 1</li>
          <li>^[0-9]*[1-9][0-9]*$</li>
          <li>required</li>
          <li>unique number associated to atom type</li>
        </ul>
      </li>
      <li>
        <span class="bold">name</span>:
        <ul>
          <li>
            alphanumeric string comprehensive of 62 characters
            (A-Z+a-z+0-9, case-sensitive, no blank spaces allowed) plus underscores and hyphens
          </li>
          <li>^[-0-9a-zA-Z_]+$</li>
          <li>required</li>
          <li>unique atom name</li>
        </ul>
      </li>
      <li>
        <span class="bold">description</span>:
        <ul>
          <li>string including any character except for commas and semicolons</li>
          <li>^[^,;]+$</li>
          <li>required</li>
          <li>brief atom description of its peculiarities</li>
        </ul>
      </li>
      <li>
        <span class="bold">moq</span>:
        <ul>
          <li>integer equal or greater than 1</li>
          <li>^[0-9]*[1-9][0-9]*$</li>
          <li>required</li>
          <li>minimum order quantity</li>
        </ul>
      </li>
      <li>
        <span class="bold">quantity</span>:
        <ul>
          <li>integer equal or greater than 1</li>
          <li>^[0-9]*[1-9][0-9]*$</li>
          <li>required</li>
          <li>number of identical atoms</li>
        </ul>
      </li>
      <li>
        <span class="bold">unitCost</span>:
        <ul>
          <li>floating point number</li>
          <li>^(?:[1-9]\d*|0)?(?:\.\d+)?$</li>
          <li>required</li>
          <li>cost of single atom</li>
        </ul>
      </li>
      <li>
        <span class="bold">totalCost</span>:
        <ul>
          <li>floating point number</li>
          <li>^(?:[1-9]\d*|0)?(?:\.\d+)?$</li>
          <li>required</li>
          <li>sum of cost of all identical atoms if moq equals 1 otherwise unitCost times a multiple of respective moq</li>
        </ul>
      </li>
      <li>
        <span class="bold">currency</span>:
        <ul>
          <li>
            3 capital character length string according to currency designator
            <a
              href="https://en.wikipedia.org/wiki/ISO_4217"
              target="_blank"
            >ISO 4217</a>
          </li>
          <li>[A-Z]{3}</li>
          <li>required</li>
          <li>
            currency relative to
            <span class="bold">unitCost</span> and
            <span class="bold">totalCost</span>
          </li>
        </ul>
      </li>
      <li>
        <span class="bold">GTIN</span>:
        <ul>
          <li>8, 12, 13, or 14 digit length number</li>
          <li>^(\d{8}|\d{12}|\d{13}|\d{14})$</li>
          <li>recommended if available</li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Global_Trade_Item_Number"
              target="_blank"
            >Global Trade Item Number</a>
          </li>
        </ul>
      </li>
      <li>
        <span class="bold">SKU</span>:
        <ul>
          <li>no standard defined: alphanumeric string with underscores, hyphens and blank spaces allowed</li>
          <li>^[-0-9a-zA-Z_. /]+$</li>
          <li>recommended</li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Stock_keeping_unit"
              target="_blank"
            >Stock Keeping Unit</a>
          </li>
        </ul>
      </li>
      <li>
        <span class="bold">vendorUrl</span>:
        <ul>
          <li>URL with HTTP string</li>
          <li>https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&amp;//=]*)</li>
          <li>
            required if relative
            <span class="bold">link</span> entry is blank
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/URL" target="_blank">Uniform Resource Locator</a> of atom vendor
          </li>
        </ul>
      </li>
      <li>
        <span class="bold">leadTime</span>:
        <ul>
          <li>
            alphanumerical upper case character string according to
            <a
              href="https://en.wikipedia.org/wiki/ISO_8601#Durations"
              target="_blank"
            >ISO 8601</a>
          </li>
          <li>^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$</li>
          <li>recommended</li>
          <li>time required from the placement of an order to arrival of product at your doorstep</li>
        </ul>
      </li>
      <li>
        <span class="bold">link</span>:
        <ul>
          <li>URL with HTTP string</li>
          <li>https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&amp;//=]*)</li>
          <li>
            required if relative
            <span class="bold">vendorUrl</span> entry is blank
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/URL" target="_blank">Uniform Resource Locator</a> of atom if custom made or not for sale
          </li>
        </ul>
      </li>
      <li>
        <span class="bold">notes</span>:
        <ul>
          <li>string including any character except for commas and semicolons</li>
          <li>^[^,;]+$</li>
          <li>not required</li>
          <li>text ad libitum</li>
        </ul>
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
  name: "HelpBomProtocol",
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