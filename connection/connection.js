import mongoose from "mongoose";

async function connect(){

    mongoose.set("strictQuery", true);
  const db = await mongoose
    .connect(process.env.MONGO_URI, {
    })
    .then(() => console.log(`connection successful`))
    .catch((error) => console.log(`no connection ${error}`));
  return db;
}

export default connect;