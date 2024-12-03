
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add your name"],
    },
    email: {
      type: String,
      require: [true, "Please add your email"],

    },
    password: {
      type: String,
      require: [true, "Please add your password"],
    },
    photo: {
      type: String,
      require: [true, "Please add a photo"],
      default: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

export default mongoose.model("User", userSchema);

