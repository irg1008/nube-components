import { Spinner, Typography } from '@material-tailwind/react';

export const LoadingScreen = () => {
  return (
    <div className="animate-fade flex h-full w-full flex-col items-center justify-center gap-4 bg-transparent">
      <Typography variant="small">Cargando editor</Typography>
      <Spinner className="h-6 w-6" />
    </div>
  );
};
