import connectDB from "./db/index.js";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("MONGODB Connection Failed -----", err);
  });
