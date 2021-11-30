const fs = require("fs");
const axios = require("axios");
const process = require("process");

function writeUrls(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    let arr = data.toString().split("\n");
    arr.pop();
    for (i in arr) {
      axios
        .get(arr[i])
        .then((res) => {
          let url = res.request.res.connection.servername;
          let data = res.data;
          let path;

          if (url.includes("www")) {
            path = url.slice(4);
          } else {
            path = url;
          }

          fs.writeFile(path, data, "utf8", function (err) {
            if (err) {
              console.error(`Could not write to ${path}`);
              process.exit(1);
            }

            console.log(`Wrote to ${path}`);
          });
        })
        .catch((err) => console.log(`Could not download ${err.config.url}`));
    }
  });
}
writeUrls(process.argv[2]);
