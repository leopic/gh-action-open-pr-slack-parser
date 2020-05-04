const zlib = require('zlib');

// Goes from a hex representation of gzipped binary data to an object
module.exports.decode = input => {
  if (typeof input.join === 'function') {
    input = input.join('');
  }

  const tempBuffer = Buffer.from(input, 'hex');
  const unzippedBuffer = zlib.gunzipSync(tempBuffer);
  const contents = unzippedBuffer.toString('utf8');

  return JSON.parse(contents);
};

// Goes from an object to a zipped buffer encoded in hex
module.exports.encode = input => {
  const inputAsString = JSON.stringify(input);
  const tempBuffer = Buffer.from(inputAsString);
  const zippedBuffer = zlib.gzipSync(tempBuffer);

  return zippedBuffer.toString('hex');
};
