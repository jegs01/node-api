const { handleErrors } = require('./errorController');

const view = (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/plain');
  res.end('Home | Welcome');
};

exports.view = handleErrors(view);
