
const longComputation = () => {
  let sum = 0;
  const configNumber = parseInt(process.argv[2], 10);
  console.info(`Child worker ${process.pid} get configNumber ${configNumber}`, process.argv);
  // tslint:disable-next-line:no-increment-decrement
  for (let i = 0; i < configNumber; i++) {
    sum += i;
  }

  console.info('Sum!!!!', sum);
  return sum;
};

process.on('message', async (msg) => {
  const sum = await longComputation();
  process.send(sum);
});
