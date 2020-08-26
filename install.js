const fs = require("fs"), https = require("https");

// download jQuery
let out = fs.createWriteStream("embedded-router.min.js");
fs.createReadStream("jquery-2.2.4.min.js").pipe(out);

// once done, append embedded-router.js
out.on("close", () =>
{
    out = fs.createWriteStream("embedded-router.min.js", { flags: "a" });
    fs.createReadStream("embedded-router.js").pipe(out);
});
