const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, saltRounds, function (err, hashpassword) {
    if (err) return next(err);
    user.password = hashpassword;
    next();
  });
});

userSchema.methods.validatePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatchPassword) => {
    if (err) return cb(err);

    cb(null, isMatchPassword);
  });
};

module.exports = model("User", userSchema);
