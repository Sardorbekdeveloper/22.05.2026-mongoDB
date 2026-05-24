const { Schema, model } = require("mongoose");

const Author = new Schema({
  full_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 70
  },
  birth_year: {
    type: Date,
    required: true,
     validate: {
      validator: function(value) {
        return value < new Date();
      },
      message: "xato"
    }
  },
  death_year: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true,
     trim: true,
    minlength: [20, "juda qisqa"],
    maxlength: [5000, "juda uzun"]
  },
  period: {
    type: String,
    required: true,
    enum: {
      values: ["Temuriylar davri", "Jadid davri", "Sovet davri", "Mustaqillik davri"],
      default: "Temuriylar davri",
      message: "{Values} bunday qiymat ko'rsatilmagan"
    }
  },
  work: {
    type: String,
    required: true,
     trim: true,
    minlength: [2, "nomi juda qisqa"]
  },
  region: {
    type: String,
    required: true,
     trim: true,
    minlength: [2, "joy nomi juda qisqa"]
  }
}, {
  versionKey: false,
  timestamps: true
})

const AuthorSchema = model("Author", Author)
module.exports = AuthorSchema