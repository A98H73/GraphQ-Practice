const mongoose = require("mongoose");
const CreateSchema = mongoose.Schema;

const BookSchema = new CreateSchema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  authorID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);
