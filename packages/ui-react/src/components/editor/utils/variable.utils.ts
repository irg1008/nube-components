import { Variable } from '@/editor/components/ui/variable-input';

export const fillDisplayValue = (
  displayValue: string,
  variables: Variable[],
  resolver: (key: Variable['key']) => string,
) => {
  const variableKeys = variables.map((v) => v.key);

  variableKeys.forEach((key) => {
    displayValue = displayValue.replaceAll(getFormat(key), resolver(key));
  });

  return displayValue;
};

export const variableFormat = '{{#}}';
export const getFormat = (key: Variable['key']) =>
  variableFormat.replaceAll('#', key.toString());
