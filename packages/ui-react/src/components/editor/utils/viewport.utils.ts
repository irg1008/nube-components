import { CanvasSize } from '@/editor/stores/canvas.store';
import {
  BookAIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LucideIcon,
  Music2Icon,
  TwitterIcon,
} from 'lucide-react';

export type Viewport = {
  name: string;
  detail: string;
  canvasSize: CanvasSize;
};

export type ViewportCategory = {
  name: Viewport['name'];
  icon: LucideIcon;
  viewports: Record<Viewport['detail'], CanvasSize>;
};

export const viewportCats: ViewportCategory[] = [
  {
    name: 'Amazon',
    icon: BookAIcon, // Add the appropriate icon for Amazon
    viewports: {
      'Product Image': {
        w: 500,
        h: 500,
      },
      'Banner Ad': {
        w: 1200,
        h: 1200,
      },
    },
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
    viewports: {
      'Square Ad': {
        w: 1080,
        h: 1080,
      },
    },
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    viewports: {
      'Square Ad': {
        w: 1080,
        h: 1080,
      },
    },
  },
  {
    name: 'Twitter',
    icon: TwitterIcon,
    viewports: {
      'Square Ad': {
        w: 1200,
        h: 1200,
      },
    },
  },
  {
    name: 'LinkedIn',
    icon: LinkedinIcon,
    viewports: {
      'Square Ad': {
        w: 1080,
        h: 1080,
      },
    },
  },
  {
    name: 'TikTok',
    icon: Music2Icon,
    viewports: {
      'Square Ad': {
        w: 1080,
        h: 1080,
      },
    },
  },
];
