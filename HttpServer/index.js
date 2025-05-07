import express from "express";
const app = express();

// Parse JSON bodies
app.use(express.json());

const users = [{
  name: "John",
  kidneys: [{ healthy: false }]
}];

// GET / → count John’s kidneys
app.get("/", (req, res) => {
  const johnkidneys = users[0].kidneys;
  let numberOfHealthyKidneys = 0;
  for (const k of johnkidneys) {
    if (k.healthy) numberOfHealthyKidneys++;
  }
  res.json({
    numberOfKidneys: johnkidneys.length,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys: johnkidneys.length - numberOfHealthyKidneys
  });
});

// POST / → add a new kidney
app.post("/", (req, res) => {
  users[0].kidneys.push({ healthy: req.body.isHealthy });
  res.json({ msg: "Done!" });
});

// PUT / → mark all kidneys healthy
app.put("/", (req, res) => {
  for (const k of users[0].kidneys) k.healthy = true;
  res.json({ msg: "All kidneys set to healthy" });
});

// DELETE / → remove all unhealthy kidneys
app.delete("/", (req, res) => {
  if (isThereAtleastOneUnhealthyKidney()) {
    const newKidneys = [];
    // ▶️ Fixed: use dot, not comma, to get the length
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({ healthy: true });
      }
    }
    users[0].kidneys = newKidneys;
    res.json({ msg: "done" });
  } else {
    res
      .status(400)
      .json({ msg: "you have no bad kidneys" });
  }
});

function isThereAtleastOneUnhealthyKidney() {
  let found = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      found = true;
    }
  }
  return found;
}

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
