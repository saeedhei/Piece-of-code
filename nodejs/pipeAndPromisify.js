const stream = require('stream')

(async () => {
  const pipeline = util.promisify(stream.pipeline)
  const read = fs.createReadStream('data.txt.gz');
  const gunzip = zlib.createGunzip();
  const write = fs.createWriteStream('data.txt');

  await pipeline(read, gunzip, write);
})();
