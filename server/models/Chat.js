const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    fullname: {
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
