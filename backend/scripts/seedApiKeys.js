const crypto = require("crypto");

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);

  console.log(buffer.toString("hex"));
}

generateRandomToken();
