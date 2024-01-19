import { useEditor } from '@/editor/hooks/useEditor';
import { useConfig } from '@/editor/stores/canvas.store';
import {
  fillDisplayValue,
  variableFormat,
} from '@/editor/utils/variable.utils';
import { Text, Url, VariableMeta, Widget } from '@/editor/utils/widget.utils';
import { Typography } from '@material-tailwind/react';
import { JSONContent } from '@tiptap/core';
import { Variable, VariableInput } from '../variable-input';

type VariableWidgetProps = {
  label: string;
  variables: Variable[];
};

type WithMeta<T, P = unknown> = Widget<T, P, VariableMeta>;

export const VariableWidget: WithMeta<Url | Text, VariableWidgetProps> = ({
  initialValue,
  onChange,
  meta,
  label,
  variables,
}) => {
  const { scapeEditingState } = useEditor();
  const { variablesConfig } = useConfig();

  const resolveDisplayValue = (displayValue: string) => {
    if (!variablesConfig) return displayValue;
    const { variableValueResolver } = variablesConfig;
    return fillDisplayValue(displayValue, variables, variableValueResolver);
  };

  const onVariableChange = (value: string, content: JSONContent) => {
    const displayValue = resolveDisplayValue(value);
    onChange(displayValue, { content, value });
  };

  return (
    <>
      <Typography variant="small" className="mb-3 font-bold">
        {label}
      </Typography>
      <div onClick={() => scapeEditingState()}>
        <VariableInput
          format={variableFormat}
          variables={variables}
          content={meta.content ?? initialValue}
          onChange={onVariableChange}
        />
      </div>
    </>
  );
};

export const TextVariableWidget: WithMeta<Text> = (props) => {
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

export const UrlVariableWidget: WithMeta<Url> = (props) => {
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
