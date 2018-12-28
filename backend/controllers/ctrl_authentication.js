module.exports.register = function(req, res) {
  console.log("REGISTER !!!");
  res.status(200);
  res.json({
    "message" : "Register done"
  });
};

module.exports.login = function(req, res) {
  console.log("LOGIN !!!");
  res.status(200);
  res.json({
    "message" : "Login done"
  });
};

module.exports.getProfile = function(req, res) {
  console.log("PROFILE !!!");
  res.status(200);
  res.json({
    "message" : "Profile done"
  });
};
