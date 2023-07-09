/**
 *
 * @param {Response} res Response
 * @param {Number} code Error code
 * @param {String} error Error message
 */
const handler = (res, code, error) => {
  console.log(error);
  return res.status(code).json({
    error: error,
  });
};

module.exports = handler;
