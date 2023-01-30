import useRequest from '@/utils/hooks/useRequest';
import { IEntityComboBox } from 'types/components/inputComponents';
import SelectBox from '../SelectBox';

function EntitySelect ({
  request,
  valueField = 'id',
  labelField = 'name',
  ...props
}: IEntityComboBox) {
  const { data, loading } = useRequest(request);

  return (
    <SelectBox
      options={data?.results}
      loading={loading}
      enableSearchBox
      clearable
      valueField={valueField}
      labelField={labelField}
      {...props}
    />
  );
}

export default EntitySelect;
