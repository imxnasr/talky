import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date_joined: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },

  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
});

export default models.User || model("User", UserSchema);
