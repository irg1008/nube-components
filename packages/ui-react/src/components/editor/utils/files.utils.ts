export const donwloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};

export const getObjectFromFile = async (file: File) => {
  try {
    const text = await file.text();
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
};

export const saveObjectAsFile = (object: object, fileName: string) => {
  const blob = new Blob([JSON.stringify(object)], { type: 'application/json' });
  donwloadBlob(blob, fileName);
};

export const saveHTMLDoc = (doc: Document, fileName: string) => {
  const blob = new Blob([doc.documentElement.outerHTML], { type: 'text/html' });
  donwloadBlob(blob, fileName);
};
