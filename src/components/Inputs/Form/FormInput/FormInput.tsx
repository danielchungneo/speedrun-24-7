import React from 'react';
import { get, useFormContext } from 'react-hook-form';
import Text from '@/components/Text';

// ? INPUTS leave as relative imports to avoid 'require' cycles
import FormTextField from '../FormTextField';
import FormSelect from '../FormSelect';
import FormDate from '../FormDate';
import FormSwitch from '../FormSwitch';
import FormCheckbox from '../FormCheckbox';

// import SelectBox from "../SelectBox";
// import SelectSearch from "../SelectSearch"
// import Switch from "../Switch";

function FormInput(props: any) {
  const {
    name,
    label,
    registerOptions,
    type: inputType,
    as: overrideType,
    prepend,
    append,
    defaultValue,
  } = props;
  const type = overrideType || inputType || null;

  const { formState, register } = useFormContext();
  const error = get(formState.errors, name)?.message;
  const isInvalid = !!error;

  function renderInput() {
    switch (type) {
      case 'text':
      case 'textarea':
      case 'number':
      case 'decimal':
      case 'password':
        const isTextArea = type === 'textarea';
        const isPassword = type === 'password';

        return (
          <>
            <FormTextField
              // props from user
              type={type}
              secureTextEntry={isPassword}
              multiline={isTextArea}
              {...props}
              //
              // error checking
              danger={isInvalid}
              error={error}
            />
          </>
        );
      case 'select':
        return (
          <>
            <FormSelect
              // props from user
              {...props}
              //
              // error checking
              isInvalid={isInvalid}
            />
          </>
        );
      case 'date':
      case 'time':
      case 'datetime':
        return (
          <>
            <FormDate
              // props from user
              {...props}
              //
              // error checking
              isInvalid={isInvalid}
            />
          </>
        );
      // case "selectSearch":
      //     return(
      //       <>
      //         <SelectSearch
      //           {...registration}
      //           {...props}
      //           isInvalid={isInvalid}
      //         />
      //       </>
      //     )
      case 'switch':
        return (
          <>
            <FormSwitch {...props} isInvalid={isInvalid} />
          </>
        );
      case 'checkbox':
        return (
          <>
            <FormCheckbox {...props} isInvalid={isInvalid} />
          </>
        );
      // Gonna have to make select box here
      default:
        return <Text>---</Text>;
    }
  }

  function renderInputWithAccessories() {
    return (
      <>
        {renderInput()}
        {!!error && (
          <Text center danger>
            {error}
          </Text>
        )}
        {/* {!!error && <Block flex={0} danger></Block>} */}
      </>
    );
  }

  return renderInputWithAccessories();
}

export default FormInput;
