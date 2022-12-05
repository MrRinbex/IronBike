const app = require("./app");
cors = require("cors");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
