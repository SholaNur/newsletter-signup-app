const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const eMail = req.body.eMail;

  // After we signed to Mailchimp documentation - we get api key and list id whic
  // is very unique to my account. And we shall create up to documentation object

  const data = {
    members: [
      {
        email_address: eMail,
        status: "subsrubed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const listId = "720277dcb4";
  const url = `https://us10.api.mailchimp.com/3.0/lists/${listId}`;

  const options = {
    method: "POST",
    Authorization: "Basic:b8f1b333aa5d518a8b8c8db56bcacada-us10",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("APP listening on port 3000");
});
// After creating JS Data we have to format it JSON DATA
// up to MCH DOCs as down bellow:
