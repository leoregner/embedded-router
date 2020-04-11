const fs = require("fs"), https = require("https");

// download jQuery
let out = fs.createWriteStream("embedded-router.min.js");
https.get("https://code.jquery.com/jquery-2.2.4.min.js", response => response.pipe(out));

// once done, append embedded-router.js
out.on("close", () =>
{
    out = fs.createWriteStream("embedded-router.min.js", { flags: "a" });
    fs.createReadStream("embedded-router.js").pipe(out);
});
