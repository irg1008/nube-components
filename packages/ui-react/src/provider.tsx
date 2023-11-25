import { ThemeProvider } from '@material-tailwind/react';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export const NubeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <Toaster
        position="bottom-center"
        richColors={false}
        closeButton
        toastOptions={{
          className: 'font-sans text-sm',
        }}
      />
      {children}
    </ThemeProvider>
  );
};
