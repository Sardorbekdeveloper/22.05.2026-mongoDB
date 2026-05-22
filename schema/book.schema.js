const { Schema, model } = require("mongoose");

const Book = new Schema({
  title: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  published_year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: {
      values: ["Badiiy", "Ilmiy", "Tarixiy", "Darslik", "Detektiv"],
      default: "Badiiy",
      message: "{VALUE} bunday janr ko'rsatilmagan"
    }
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "Author", 
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

const BookSchema = model("Book", Book);
module.exports = BookSchema;
