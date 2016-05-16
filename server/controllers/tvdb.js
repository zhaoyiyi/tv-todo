import tvdb from '../tvdb';

function search(req, res) {
  tvdb.search(req.params.searchText)
      .then(result => {
        res.json(result.data)
      });
}

function detail(req, res) {
  tvdb.getDetail(req.params.id)
      .then(result => res.json(result.data))
}

export {search, detail}