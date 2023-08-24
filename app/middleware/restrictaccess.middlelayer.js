// apply restricting to specific members
module.exports = (...role) => {
  //  roles is an array like ['admin','lead-guide'] using res-parameter syntax
  return (req, res, next) => {
    console.log(role);
    if (!role.includes(req.user.role[0])) {
      console.log("!role.includes(req.user.role)",role);
      return next(
        new AppError(' you do not have sufficient permission to perform this action', 403)
      );
    }
    next();
  };
};
