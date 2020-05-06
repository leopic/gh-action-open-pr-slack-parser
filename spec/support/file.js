// var fs = require('fs');
// var argv = process.argv.slice(2);
// var path = require('path');

// var filename = path.resolve(argv[0]);
// var file = fs.readFileSync(filename, { encoding: 'utf8' });
// var cassettes = JSON.parse(file);

// cassettes.forEach(function (cassette) {
//   console.log(cassette);
//   return;
//   if (cassette.headers['content-encoding'] !== 'gzip') {
//     return;
//   }
//
//   var response = new Buffer(cassette.response[0], 'hex');
//
//   var contents = zlib.gunzipSync(response).toString('utf8');
//
//   cassette.response = JSON.parse(contents);
//   delete cassette.headers['content-encoding'];
// });

// De binario hacia JSON...
const zlib = require('zlib');

const input = [
  "1f8b0800000000000003ed5cdb72e3b811fd1516abf214dbbc88ba585553934d8dd7d9ad58cece7a33136fa55420094ab02952e1c51e89e57fcf6910d4cd1e4bb2917d095f6c89040e1a9706bafb34f47b6596596c0ecd6951ccf3a165b1b9389b88625afa67413ab3323e4f732be6e95c04d6647aca8242a4c9693ae7c9e93c3b4dd242448267d6bc8ce3dc72cd135384e6d0733a6ec7ee39de8999a4211fd333f3ead3c5b7ebf8af8e7ff9edd7dbaf3f3ab75f47f6e8d3c5f2eaeeea71747761a3eeb498c5e36d793664394c0a294428a2e8fd40670403b4392b82a9063889434394e725dfc17be3b84ba87ae09372e6f3cc1c",
  "ba27665eb08263c8699ad05e9c06f71c5310b138e72766218a98dede640b914c8c22358a4c4c263c3398f18fcf285fe68453a1de442428580fbc9a5bc7e93b839d89fda5f7cfafa338b8bbf8365a5e78a31f3e7c4061f6c00a96ed76533ecc5db5c6a8a5204d0a9e1472b995560dfff1e183078849a640e40222c95e5bab04d6ac55943d6431a15894c671fa889abb926e2bc226b8b5aab3aa8f813cba3eea54565a4c390609a23f5187455e1c23882c5f59f40f4a460898fa2ce3e111c2a81a10e531811495d4790955fa7990893969fc31426dd5034e9a4d582296ec581cd4cb515d6e4147f44796473dfe8055754cc5ba4265cd33f1c082050d41c6032e1e309c4783edd40456b19893d6fd46ca85c115051fb370460a26f5f2e9c4f4d37081125f441c1ba230fc9827e147940d320e7d0ec7acc05bd776ed53bb7b6a7b376e6768f786def92dca94f3706f99204e73059360bf3e31673c9b3c7f308626ce4431cea70ced793e0fa2be6d77bda81706dceef2aee7f0c8768273ee77fb8e33e8da8163772003cb733149387ad9ee1d9b8768bb771cba6d5bedde013beb2d7b47a37bb939fcbdd5be56fbda93fb8f3bb9ff4d86c27f6087d3219df107c1c99e84226ebd28389ba98731f3795c6b2a59b6aedde9f5bddea0d7dbf6977eebdd5cfe286ebf3c2eae3e5db9a3e52feef5a77f917bf3aa197ca8cb560b61f164ca9280cf602c013961333252b61f06699cc2213099cb39278728e4112b6358234556c2a108f96ab5a1d4883f1a110c9632e3469a196a64cca7934afa86abce0e0ee82c39013a3b3b49d3f04fae1d892c2ff05f7a4feb5ed35b43be339a374dd7fb76b72f7dc157bb7e2901d0e9843fc288a245f08435301331d6469a60646bbb2bcc5884d153fe586d6eedb1540f9d55e5885b0a1412d70b521a75fb0de2b73443a8cfda79dd603fae9946f4caaa7d5cb2ccf576a771a3e5b0a9fe90130dcb4dd3bc346856109c47dd733e18446e97858c7507811d9235dd8978df751def9cf73cbf778e3e4e3983c2e034a7ed029a55fbe1c3028b09be631384a9c73ec2fb175ed436fc116db6befff320586bbfb7f6fb9e6d606b89bcc57ea71d91745d1e913dc73db7bb9dfe4ef8f4f13afe390e2ecf97ecebe78720b95f206cbab8bef9c1b95a0614715387f7f7c3b42813c1f11fab827b03aa282f8321144c5487950c12b50e7e1b1c6c83837f6c70f09070f62b0c8d345d37cdf44b51fcadf48d9ad0318a292b8cac4c72238533002220640b8325a1a1189edc20f7c59871e218502832885b30c8da6c2c7cb24360fbdeafb60a1d86bbc2dcb3fb1e6a4e927824e63d5f684224a4cac25f157e87bf006b2dcd5891ee63140e157a0bb28285ba6e810c61e956eab1b66b0f1576679ade6b82945090b2a6bc0e89a21f3a2cca646f82f66bcf4067233516e45f85d7f48cf40aaeb21aeac7cfe0864f75b91b0d5a65d59fe44a61134db34a4800f4e3d4d784089ad79270950597a5a6c28ab13e89099fd0b6e0331e69149fd056f045c6754da5149de056e0ff23cfb452231fb36452b2892ef957705831c4354ed8722fdb7ae826b0c6033811c999f04b9d5bef1a91a4af6d1e3a01f56c031b806b78c9b76ac59788728088d7d324bb02db5228ad0dd0badf6d446fd4e7a5b8527d50a9377a66419d542fb5a6721fb44d89cca4c8adeacf483599aa30d99c659a924dd00302b32a9f81af3e3b3bab284245cd482259532f6a2c80b22c98827cd733095583061b70c60a99e61091e8213cda3865a126e9577080ae275e8ffc35d6660454467af5804ba84dec55c45a53036bbccd566adf22382431e4d003610bb2fa980b7833270cb90e58b8850804f402a1539af79afed0337e3516ba06f684b0331e73a888a6c16bd02aab4ef109f93c4e171a83",
  "f91b80744a7c2fdbc41e7606436fb027dbc4e90dbb2e959997f9744fd20ab6783501f884b8eb31c97e44f1a2953c6f32f3f0fd2f6b80e1dee0960240524cb2bbc7bc458e87dd33fb181074640abe680eababe18872b1c467c7f61005dc309b82b4045137b44fcc47ca26245364fda831b5c005fc8cccb95f65f61661b37c5c6f200d65474fe6597ac70370378ac6a367ebed6be3e1a3b8175b15c9385cb9f9d2a9de106226b22c55797f35dda5b6de750662287286eca6f5030a2628091b24072a2a029ee4329d081e363a05eb05bd51d1cbab9f6e8cbfab1218a279f84de599fe748342af061f14706e29c08d1cd5009c6b7c77fba5bbbcbdb95882b594310df41623be212566663d03f2a52206c7b5bf45c232f0c199f944895dd80c5e20725409da2f88be597dad491b3e708380055ebfdbf1fd8ec76da7138583c8f3bb2ef31d7be0753d177f2545da266c3ecb5c6e499b96b4d97300b7a48da49bda8ceea0cde8debdf8b1a51b6d56e61bb3325bd20676cd3baf16b5a4cdab37af5ad266f72e5a4bdabc7845af256d76ee2cc241a720604bdabc709fb3256dbe7bd5b5256dbe9f604611bc96b439eae6744301b5a4cdf35be52d69f38aaab5a4cdfb7eb2a0256dd6d7885bd246ada596b469f8a7ff7bd2661c8b84889fcacc790c7ea632a7354ff3ce7846f35329e085283cf402f0318b50fef20a7ef3046892e17b01eebd3f2d02e82677453ffafac6159ad9b9aaa6afb5cd5b71f27ad7b3c674b7f53cdb470d2312b074b7e5ae6efba18d2639505f23c75f5d23ce9395c5143430325dd340c8140f8402afbf8c2e3ee34ee47f01075900ef77480000"
];

// const response = Buffer.from(input.join(''), 'hex');
// const contents = zlib.gunzipSync(response).toString('utf8');
// const parsedResponse = JSON.parse(contents);
//
// // Vamos de vuelta
// const json = require('./pulls.json');
// const tempBuffer = Buffer.from(JSON.stringify(json));
// const zippedBuffer = zlib.gzipSync(tempBuffer).toString('hex');
//
// console.log('equal?', input.join('') === zippedBuffer);

const decode = input => {
  if (typeof input.join === 'function') {
    input = input.join('');
  }

  const tempBuffer = Buffer.from(input, 'hex');
  const unzippedBuffer = zlib.gunzipSync(tempBuffer);
  const contents = unzippedBuffer.toString('utf8');
  const parsedContent = JSON.parse(contents);

  return parsedContent;
};

const encode = input => {
  const inputAsString = JSON.stringify(input);
  const tempBuffer = Buffer.from(inputAsString);
  const zippedBuffer = zlib.gzipSync(tempBuffer);
  const bufferAsHex = zippedBuffer.toString('hex');

  return bufferAsHex;
};

const json = require('./pulls.json');
const k1 = Object.keys(json[0]).sort();
const k2 = Object.keys(decode(input)[0]).sort();
console.log('equal?', k1.length, k2.length);
