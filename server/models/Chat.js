const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Chat", chatSchema);
