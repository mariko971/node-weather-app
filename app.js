const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./src/utils/geocode");
const forecast = require("./src/utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "./public");
const viewpath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "mariko971", fileType: "hbs" });
});

app.get("/help", (req, res) => {
  res.render("help", { name: "mariko971", title: "how may help you" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "mariko971",
    occupation: "Fullstack Developer",
    location: "Dubai, United Arab Emirates",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address!" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          res.send({ error: error });
        } else {
          res.send({
            forecast: forecastData.forecast,
            location,
            address: req.query.address,
          });
        }
      });
    }
  );
});
0;

app.get("/help/*", (req, res) => {
  res.render("pageNotFound", { message: "Help article not found!" });
});

app.get("*", (req, res) => {
  res.render("pageNotFound", { message: "Page not found!" });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
