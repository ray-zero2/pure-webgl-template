const { argv } = require('process');
const { build } = require('esbuild');
const path = require('path');

const options = {
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV },
  entryPoints: [path.resolve(__dirname, 'src/index.js')],
  minify: argv[2] === 'production',
  bundle: true,
  target: 'esnext',
  platform: 'browser',
  outdir: path.resolve(__dirname, 'lib')
  // tsconfig: path.resolve(__dirname, 'tsconfig.json')
};

build(options).catch(err => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
