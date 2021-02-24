const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// create schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

//list all if no name and number
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((result) => {
    console.log(`${name} with ${number} was added to the phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  console.log("please provide both name and number");
  mongoose.connection.close();
} else {
  console.log("please provide password, name and number");
  mongoose.connection.close();
}
