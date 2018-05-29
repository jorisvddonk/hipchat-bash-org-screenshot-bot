var port = process.env.PORT || 3000;

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const imgur = require("imgur");

app.use(bodyParser.json());
app.post("/bash-screenshot", (req, res) => {
  console.log(req.body);

  var imgur = require("imgur");
  var bashScreenshot = require("bash-screenshotter");
  bashScreenshot(1, {args: ['--no-sandbox', '--disable-setuid-sandbox']})
    .then(function(data) {
      return imgur
        .uploadBase64(data[0].toString("base64"))
        .then(function(json) {
          return json.data.link;
        });
    })
    .catch(function(error) {
      var retval = {
        color: "red",
        message: `Error: ${error}`,
        notify: false,
        message_format: "text"
      };
      console.error(error);
      res.send(JSON.stringify(retval));
    })
    .then(function(imgururl) {
      var retval = {
        color: "green",
        message: `<img src="${imgururl}"/>`,
        notify: false,
        message_format: "html"
      };
      console.log(retval);
      res.send(JSON.stringify(retval));
    });
});

app.listen(port, () => console.log("Server started on port", port));
