const { Schema, model } = require("mongoose");

const Book = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "minimal nom"],
    maxlength: [150, "maximal nom"]
    
  },
  pages: {
    type: Number,
    required: true,
    min: [1, "sahifa min qiymat"],
    max: [10000, "sahifa max qiymati"]
  },
  published_year: {
    type: Number,
    required: true,
     min: 1000, 
    max:  new Date().getFullYear()

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
    required: true,
     min: [0, "narx manfiy bo'lishi mumkin emas"]
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
