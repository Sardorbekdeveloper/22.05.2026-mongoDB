const { Schema, model } = require("mongoose");

const Auth = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
      /*   validate: {
      validator: function(value) {
        return value < new Date();
      },
      message: "xato"
    } 
    */
  
  password: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: false,
  },
  otpTime: {
    type: BigInt,
    required: false,
  
  },
  role: {
    type: String,
    required: true,
    default: "user",
  enum: ["user", "admin", "superadmin"]
    },
 
}, {
  versionKey: false,
  timestamps: true
})

const AuthSchema = model("Auth", Auth)
module.exports = AuthSchema