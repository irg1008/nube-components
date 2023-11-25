import { useEditor } from '@/editor/hooks/useEditor';
import { useConfig } from '@/editor/stores/config.store';
import { Typography } from '@material-tailwind/react';
import { JSONContent } from '@tiptap/core';
import { Variable, VariableInput } from '../variable-input';
import { Text, Url, Widget } from './widget.types';

type VariableWidgetProps = {
  label: string;
  variables: Variable[];
};

export const VariableWidget: Widget<Text | Url, VariableWidgetProps> = ({
  initialValue,
  onChange,
  meta,
  label,
  variables,
}) => {
  const { scapeEditingState } = useEditor();

  const { variablesConfig } = useConfig();
  if (!variablesConfig) return <></>;

  const { variableValueResolver, imageVariables, textVariables } =
    variablesConfig;
  const variableKeys = [...imageVariables, ...textVariables].map((v) => v.key);

  const fillDisplayValue = (displayValue: string) => {
    variableKeys.forEach((key) => {
      displayValue = displayValue.replaceAll(
        `{{${key}}}`,
        variableValueResolver(key),
      );
    });
    return displayValue;
  };

  const onVariableChange = (value: string, meta: JSONContent) => {
    const displayValue = fillDisplayValue(value);
    const content = meta['content'] as JSONContent;
    onChange(displayValue, { content });
  };

  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        {label}
      </Typography>
      <div onClick={() => scapeEditingState()}>
        <VariableInput
          format="{{#}}"
          variables={variables}
          content={(meta['content'] as JSONContent) ?? initialValue}
          onChange={onVariableChange}
        />
      </div>
    </>
  );
};

export const TextVariableWidget: Widget<Text> = (props) => {
  const { variablesConfig } = useConfig();
  if (!variablesConfig) return <></>;

  const { textVariables, textLabel } = variablesConfig;
  return (
    <VariableWidget
      {...props}
      label={textLabel ?? 'Texto'}
      variables={textVariables}
    />
  );
};

export const UrlVariableWidget: Widget<Url> = (props) => {
  const { variablesConfig } = useConfig();
  if (!variablesConfig) return <></>;

  const { imageVariables, imageLabel } = variablesConfig;
  return (
    <VariableWidget
      {...props}
      label={imageLabel ?? 'URL'}
      variables={imageVariables}
    />
  );
};
