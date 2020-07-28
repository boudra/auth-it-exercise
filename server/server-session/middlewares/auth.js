
const authMiddleware = async (req, res, next) => {
  if (req.session.userId !== undefined) return;
  next();
};

module.exports = authMiddleware;
