import { ThemeProvider, useTheme } from '@material-tailwind/react';
import { cssScopeClassName } from 'config/styles.config';
import merge from 'deepmerge';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { useEffectOnce } from 'usehooks-ts';

export const NubeProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const inputMinWidth = 'min-w-[50px]';
  const inputBaseStyle = { base: { container: { minWidth: inputMinWidth } } };

  const customTheme = {
    input: { styles: inputBaseStyle },
    slider: { styles: inputBaseStyle },
    textarea: { styles: inputBaseStyle },
    dialog: { defaultProps: { className: cssScopeClassName } },
    chip: { styles: { base: { action: { position: 'absolute' } } } },
  };

  const markFloatingElements = (mutation: MutationRecord) => {
    const { addedNodes } = mutation;
    addedNodes.forEach((node) => {
      const el = node as HTMLElement;
      const isFloatingNode = el.hasAttribute('data-floating-ui-portal');
      if (isFloatingNode) el.classList.add(cssScopeClassName);
    });
  };

  const observeAndMarkFloatingElements = () => {
    const observer = new MutationObserver((mutations) =>
      mutations.forEach(markFloatingElements),
    );

    observer.observe(document.body, { childList: true });
    return observer;
  };

  useEffectOnce(() => {
    const observer = observeAndMarkFloatingElements();
    return () => observer.disconnect();
  });

  return (
    <ThemeProvider value={merge(theme, customTheme)}>
      <Toaster
        position="bottom-center"
        richColors={false}
        closeButton
        offset={16}
        toastOptions={{ className: 'font-sans text-sm' }}
      />
      <div
        className={cssScopeClassName}
        style={{ height: '100%', width: '100%' }}>
        {children}
      </div>
    </ThemeProvider>
  );
};
