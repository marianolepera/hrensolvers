import { Schema, model } from "mongoose";

const noteSchema = new Schema(
    {
        
      title: String,
      content: String,
      archive: {
        type: Boolean,
        default: false
    },
      category: [{
        name:String
    }],
      user: {
        type: Schema.ObjectId,
        ref: "User"
      }, 
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Note", noteSchema);