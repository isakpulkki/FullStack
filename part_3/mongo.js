const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give a password as an argument.');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://isakpulkki:${password}@cluster.ho4rzrg.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Number = mongoose.model('Number', numberSchema);

if (process.argv.length < 4) {
  Number.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
  return;
} else if (process.argv.length < 5) {
  console.log('Give a number as an argument.');
  process.exit(1);
}

const person = new Number({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((result) => {
  console.log(
    'Number ' + person.number + 'added for ' + person.name + ' to phonebook.'
  );
  mongoose.connection.close();
});
