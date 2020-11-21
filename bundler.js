const { argv } = require('process');
const { build } = require('esbuild');
const fs = require('fs');
const path = require('path');

const entryPoint = 'src/index.js';
const outputDir = 'public/js';

const isProduction = argv[2] === 'production';

const options = {
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV },
  entryPoints: [path.resolve(__dirname, entryPoint)],
  minify: isProduction,
  sourcemap: !isProduction,
  bundle: true,
  target: 'esnext',
  platform: 'browser',
  loader: { '.vert': 'text', '.frag': 'text' },
  outdir: path.resolve(__dirname, outputDir)
};

const bundle = () => {
  build(options).catch(err => {
    process.stderr.write(err.stderr);
    process.exit(1);
  });
};

if (isProduction) {
  // fs.unlinkSync(`${outputDir}/index.js.map`);
  bundle();
} else {
  fs.watch('src', { recursive: true }, () => {
    bundle();
  });
}
