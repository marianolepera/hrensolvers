import mongoose from "mongoose";
import config from "./config";

mongoose.connect("mongodb+srv://marianolepera:Manko_100@hrensolvers.lkgxrai.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((db) => console.log(`base de datos conectada`))
  .catch((err) => console.log(err));