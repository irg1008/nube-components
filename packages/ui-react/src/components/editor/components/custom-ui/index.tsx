import { Sidebar } from '../sidebar';
import { Toolbar } from '../toolbar';
import { ViewOptions } from '../view-options';

export const CustomUI = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[300] flex justify-between [&>*]:pointer-events-auto">
      <Toolbar />
      <ViewOptions />
      <Sidebar />
    </div>
  );
};
