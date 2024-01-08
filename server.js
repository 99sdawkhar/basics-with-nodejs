import { app } from "./app.js";
import { connectDb } from "./data/database.js";

connectDb()

const port = process.env.PORT;
const mode = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`Server is running on port: ${port} in ${mode} mode`);
});
