const handleClientError = (res, status, statusMessage, message) => {
  return res.status(status).json({ status: statusMessage, message })
}

module.exports = handleClientError