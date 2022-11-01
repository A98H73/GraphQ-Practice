const mongoose = require("mongoose");
const CreateSchema = mongoose.Schema;

const AuthorSchema = new CreateSchema({
  a_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Author", AuthorSchema);
