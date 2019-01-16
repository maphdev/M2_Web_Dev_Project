const handler = (methods = ['GET']) => (req, res, next) => {
  if (methods.includes(req.method)) return next();
  res.status(405).send({success: false, message: "Method not allowed."});
};

module.exports = handler;
