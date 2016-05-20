import User from '../models/user';

function saveTodo(req, res) {
  console.log('saving todo');
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { shows: req.body.shows } },
    { upsert: true }
  )
    .then((user) => {
      res.json({ saved: true });
      console.log('user updated', user);
    })
    .catch(err => console.log(err));
}

function find(req, res) {
  console.log(req.params);
  User.findOne({ email: req.params.email })
    .then(user => res.json(user))
    .catch(err => console.log(err));
}

export { saveTodo, find };
