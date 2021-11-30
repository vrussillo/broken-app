const express = require("express");
const ExpressError = require("./expressError");
const axios = require("axios");
const app = express();
const { response } = require("express");

app.get("/", async (req, res, next) => {
  try {
    const response = await axios.get("https://api.github.com/users/d");
    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    next(new ExpressError("Could Not Fetch Data", 500));
  }
});

app.post("/", async (req, res, next) => {
  try {
    let devs = req.body.developers;
    let out = [];
    let userProm = [];

    for (d in devs) {
      userProm.push(await axios.get(`https://api.github.com/users/${devs[d]}`));
    }

    Promise.all(userProm)
      .then((usernameArr) =>
        usernameArr.forEach((u) =>
          out.push({ name: u.data.name, bio: u.data.bio })
        )
      )
      .then(() => {
        return res.send(JSON.stringify(out));
      });
  } catch (err) {
    next(new ExpressError("Could Not Post Data", 500));
  }
});

// Broken code

// app.post("/users", (req, res) => {
//   const results = req.body.developers.map(async (d) => {
//     return await axios.get(`https://api.github.com/users/${d}`);
//   });
//   let out = results.map((r) => ({
//     name: r.data.name,
//     bio: r.data.bio,
//   }));
//   return res.send(JSON.stringify(out));
// });

// app.use((req, res, next) => {
//   const err = new ExpressError("Page Not Found", 404);
//   next(err);
// });

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
