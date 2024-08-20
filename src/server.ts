import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect(config.database_URL as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err:any) {
    console.log(err.message);
  }
}
