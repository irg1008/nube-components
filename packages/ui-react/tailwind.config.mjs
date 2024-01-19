import withMT from '@material-tailwind/react/utils/withMT';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindAnimated from 'tailwindcss-animated';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
  },
  important: true,
  plugins: [tailwindScrollbar({ nocompatible: true }), tailwindAnimated],
};

export default withMT(config);
