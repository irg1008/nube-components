export const createStyleWithContent = (content: string) => {
  const styleNode = document.createElement('style');
  styleNode.innerHTML = content;
  return styleNode;
};

export const getInlineStyles = () => {
  const styleNodes = document.querySelectorAll('style');
  const inlineStyles: HTMLStyleElement[] = [];

  styleNodes.forEach(({ innerHTML }) => {
    inlineStyles.push(createStyleWithContent(innerHTML));
  });

  return inlineStyles;
};
