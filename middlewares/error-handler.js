export { errorHandler };

function errorHandler(err, res) {
  return res.status(err.status).json({ message: err.message });
}
