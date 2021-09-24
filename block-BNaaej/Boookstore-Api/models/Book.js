let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: String,
  description: String,
  categories: [String],
  tags: [{ type: String }],
  CreatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  comments: { type: mongoose.Types.ObjectId, ref: 'Comment' },
});

bookSchema.index({ tags: 1 });

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
