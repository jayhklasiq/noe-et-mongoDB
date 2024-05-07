const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: "PeopleDB",
  useFindAndModify: false,
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] },
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let JoshuaAde = new Person({
    name: "Joshua Ade",
    age: 24,
    favoriteFoods: ["Rice", "Noodles", "Beans"],
  });
  JoshuaAde.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

let arrayOfPeople = [
  { name: "Joshua Ade", age: 24, favoriteFoods: ["Rice", "Noodles", "Beans"] },
  {
    name: "Frimps Ade",
    age: 14,
    favoriteFoods: ["Jollof Rice", "Ramen", "Beans cake"],
  },
  { name: "James Ade", age: 24, favoriteFoods: ["Rice", "Noodles"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

let personName = "Joshua";

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

let food = "Ramen";

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

let personId = "6639ce442d75a3034f591956";

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) {
      return console.error(err);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        console.log(err);
      }
      done(null, updatedPerson);
    },
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      console.log(err);
    }
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) {
      console.log(err);
    }
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: 1, favoriteFoods: 1})
    .exec((err, data) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      done(null, data);
    });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
