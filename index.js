// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/api", (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

app.get("/api/:date?", function (req, res) {
  // create date object from url query
  let date = new Date(req.params.date);

  // check if date is valid
  if (isNaN(date)) {
    // date is not in string format, try to parse as number
    date = new Date(+req.params.date);
  }

  // check if date is valid again
  if (isNaN(date) || date === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  // return date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});
