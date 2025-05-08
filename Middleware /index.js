import express from "express";
const app = express();

function isOldEnoughMiddleware(req, res, next) {
  // ensure age is treated as a number
  const age = parseInt(req.query.age, 10);

  if (!isNaN(age) && age >= 14) {
    next();
  } else {
    res.json({
      msg: "sorry you are not of age yet"
    });
  }
}

app.use(isOldEnoughMiddleware);
app.get("/ride2", function(req, res) {
  res.json({
    msg: "you have successfully riden the ride 2"
  });
});

// Fixed: route definition must pass the middleware into app.get(...)
app.get("/ride1", function(req, res) {
  res.json({
    msg: "you have successfully riden the ride 1"
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
