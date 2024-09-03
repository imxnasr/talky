import { model, models, Schema } from "mongoose";

const ConversationSchema = new Schema({
  name: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  last_message: { type: Schema.Types.ObjectId, ref: "Message" },
  date_created: { type: Date, default: Date.now },

  isGroup: { type: Boolean, default: false },
});

export default models.Conversation || model("Conversation", ConversationSchema);
