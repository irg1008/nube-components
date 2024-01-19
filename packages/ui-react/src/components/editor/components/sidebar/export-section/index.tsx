import { useExport } from '@/editor/hooks/useExport';
import { getIconElement } from '@/editor/utils/icons.utils';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from '@material-tailwind/react';
import {
  DownloadIcon,
  FileCodeIcon,
  FileEditIcon,
  FileImage,
  ImportIcon,
  LucideIcon,
} from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';

enum ExportFormat {
  Image = 'image',
  Snapshot = 'snapshot',
  HTML = 'html',
  TemplateHTML = 'templateHTML',
}

type FormatInfo = {
  description?: ReactNode;
  label: string;
  icon?: LucideIcon;
};

export const ExportSection = () => {
  const {
    exportExtension,
    exportCanvasImg,
    loadSnapshot,
    saveSnapshot,
    exportHTML,
    exportTemplateHTML,
  } = useExport();

  const {
    value: open,
    setTrue: openDialog,
    setFalse: closeDialog,
    setValue: setDialog,
  } = useBoolean();

  const uploadRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dialogRef, closeDialog);

  const [selectedFormat, setFormat] = useState<ExportFormat>(
    ExportFormat.Image,
  );

  const formatInfo: Record<ExportFormat, FormatInfo> = {
    [ExportFormat.Image]: {
      label: 'Imagen (.PNG)',
      description: 'Una imagen de tu template en formato PNG.',
      icon: FileImage,
    },
    [ExportFormat.TemplateHTML]: {
      label: 'Template dinámico (.HTML)',
      description: (
        <span>
          Una página web que contiene tu template en formato <em>HTML</em> con
          variables dinámicas
        </span>
      ),
      icon: FileCodeIcon,
    },
    [ExportFormat.HTML]: {
      label: 'HTML estático (.HTML)',
      description: (
        <span>
          Una página web que contiene tu template en formato <em>HTML</em> con
          estilos y texto estático
        </span>
      ),
      icon: FileCodeIcon,
    },
    [ExportFormat.Snapshot]: {
      label: `Editable (${exportExtension.toUpperCase()})`,
      description:
        'Un archivo que contiene toda la información del template, formas, texto y variables dinámicas. Puedes importarlo para recuperar tu template en cualquier momento.',
      icon: FileEditIcon,
    },
  };

  const exportFormat = async () => {
    switch (selectedFormat) {
      case ExportFormat.Image:
        exportCanvasImg();
        break;
      case ExportFormat.Snapshot:
        saveSnapshot('snapshot');
        break;
      case ExportFormat.HTML:
        exportHTML('static');
        break;
      case ExportFormat.TemplateHTML:
        exportTemplateHTML('template');
        break;
    }

    closeDialog();
  };

  return (
    <>
      <input
        aria-label="Subir snapshot"
        ref={uploadRef}
        type="file"
        className="hidden"
        accept={exportExtension}
        onChange={(e) => {
          const file = e.target.files?.[0];
          file && loadSnapshot(file);
          uploadRef.current!.value = '';
        }}
      />
      <div className="flex flex-col justify-evenly gap-2 md:flex-row">
        <Button
          fullWidth
          variant="gradient"
          onClick={() => uploadRef.current!.click()}
          className="flex items-center justify-center gap-2">
          <ImportIcon className="h-4 w-4 rotate-180" />
          Importar
        </Button>
        <Button
          fullWidth
          variant="gradient"
          onClick={openDialog}
          className="flex items-center justify-center gap-2">
          <DownloadIcon className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      <Dialog
        size="sm"
        open={open}
        handler={setDialog}
        ref={dialogRef}
        className="p-2">
        <DialogHeader>Exportar proyecto</DialogHeader>
        <DialogBody>
          <List className="p-0">
            {Object.entries(formatInfo).map(
              ([format, { label, icon, description }]) => (
                <ListItem
                  key={format}
                  selected={selectedFormat === format}
                  className={twMerge(
                    'p-0',
                    selectedFormat === format && 'bg-gray-300',
                  )}>
                  <label
                    htmlFor={format}
                    className="flex w-full cursor-pointer items-center px-3 py-2">
                    <ListItemPrefix>
                      <Radio
                        checked={format === selectedFormat}
                        onChange={() => setFormat(format as ExportFormat)}
                        crossOrigin="anonymous"
                        name="format"
                        id={format}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: 'p-0',
                        }}
                        icon={icon && getIconElement(icon, 'h-3 w-3 m-auto')}
                      />
                    </ListItemPrefix>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {label}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="text-xs font-normal">
                        {description}
                      </Typography>
                    </div>
                  </label>
                </ListItem>
              ),
            )}
          </List>
        </DialogBody>
        <DialogFooter className="gap-1">
          <Button variant="text" color="red" onClick={() => closeDialog()}>
            Cancelar
          </Button>
          <Button
            variant="gradient"
            onClick={() => exportFormat()}
            className="flex items-center justify-center gap-2">
            <DownloadIcon className="h-4 w-4" />
            Exportar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
