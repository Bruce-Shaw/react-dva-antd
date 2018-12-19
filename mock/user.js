const Mock = require('mockjs');

let db = Mock.mock({
  'data|3-6': [{
    id: '@id',
    name: '@name',
    'age|18-32': 1
  }]
});

module.exports = {
  [`GET /getDataListPages.json`](req, res) {

    res.status(200).json(db);
  },

  [`POST /addData.json`](req, res) {

    let user = req.body;
    console.log(req);
    user.id = Mock.mock('@id');
    db.data.push(user);

    res.status(200).json(user);
  }
}
