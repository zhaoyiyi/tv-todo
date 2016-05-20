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
      res.send('saved');
      console.log('user updated', user);
    })
    .catch(err => console.log(err));
}

export { saveTodo };
