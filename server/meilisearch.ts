const { MeiliSearch } = require("meilisearch");
const fs = require("fs");

try {
  // Note that jsonString will be a <Buffer> since we did not specify an
  // encoding type for the file. But it'll still work because JSON.parse() will
  // use <Buffer>.toString().
  // const jsonString = fs.readFileSync("./movies.json");
  // const movies = JSON.parse(jsonString);
  const jsonString = fs.readFileSync("./products.json");
  const products = JSON.parse(jsonString);

  // 1. Init client SDK
  const client = new MeiliSearch({ host: "http://localhost:7700" });

  // // 2. Add docs & check server response
  client
    .index("products")
    .addDocuments(products)
    .then((res) => console.log(res));

  // // 3. Check the status
  // client.getTask(0)
} catch (err) {
  console.log(err);
}

// // 4. start searching!
// client
//     .index('movies')
//     .search('spiderman')
//     .then((res) => console.log(res))
