// ============================================================
//  REQUEST ID UTIL
// ============================================================

const crypto = require('crypto');

function createRequestId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return crypto.randomBytes(16).toString('hex');
}

module.exports = {
  createRequestId,
};
