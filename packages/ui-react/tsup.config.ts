import copyfiles from 'copyfiles';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/**/*.{js,jsx,ts,tsx}'],
  dts: true,
  format: ['cjs', 'esm'],
  minify: !options.watch,
  splitting: !options.watch,
  sourcemap: true,
  clean: !options.watch,
  treeshake: !options.watch,
  external: ['react', 'react-dom', '@material-tailwind/react'],
  injectStyle: false,
  onSuccess: async () => {
    copyfiles(['package.json', 'dist'], () => {});
    console.log('React UI Build succeeded!');
  },
}));
