var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SavedSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // summary is required to give a brevity of the artical
  summary: {
    type: String,
    required: true
  
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  // `note` is an object that stores a Note id
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ],
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Saved = mongoose.model("Saved", SavedSchema);

// Export the Saved model
module.exports = Saved;
