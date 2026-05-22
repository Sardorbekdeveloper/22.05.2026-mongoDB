const BookSchema = require("../schema/book.schema");

const getAllBooks = async (req, res) => {
  try {
      const books = await BookSchema.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, pages, published_year, genre, price, description, author_id } =
      req.body;

    await BookSchema.create({
      title,
      pages,
      published_year,
      genre,
      price,
      description,
      author_id,
    });

    res.status(201).json({
      message: "Added new book",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(foundedBook);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, pages, published_year, genre, price, description, author_id } =
      req.body;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await BookSchema.updateOne({ _id: id }, {
      title,
      pages,
      published_year,
      genre,
      price,
      description,
      author_id,
    });

    res.status(404).json({
      message: "Updated book",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    
    await BookSchema.findByIdAndDelete({ _id: id });

    res.status(404).json({
      message: "Deleted book",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
};