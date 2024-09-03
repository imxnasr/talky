import { model, models, Schema } from "mongoose";

const ConversationSchema = new Schema({
  name: { type: String, blank: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message", default: [] }],
  last_message: { type: Schema.Types.ObjectId, ref: "Message", blank: true },
  date_created: { type: Date, default: Date.now },

  isGroup: { type: Boolean, default: false },
});

export default models.Conversation || model("Conversation", ConversationSchema);
