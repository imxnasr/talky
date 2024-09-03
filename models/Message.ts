import { model, models, Schema } from "mongoose";

const MessageSchema = new Schema({
  text: { type: String },
  image: { type: String },
  sender: { type: String, required: true },
  date_sent: { type: Date, default: Date.now },

  conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
});

export default models.Message || model("Message", MessageSchema);
