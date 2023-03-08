import {useState} from 'react';

export const useForm = <T extends Object>(initState: T) => {
  const [form, setForm] = useState<T>(initState);

  const setFormField = <K extends Object>(value: K, field: keyof T) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const setFormValue = (newState: T) => {
    setForm({
      ...form,
      ...newState,
    });
  };

  const setMultipleFormField = <K extends Object>(
    value: K,
    fields: (keyof T)[],
  ) => {
    const newForm = fields.reduce((object, field) => {
      return {...object, [field]: value};
    }, {});

    setForm({
      ...form,
      ...newForm,
    });
  };

  const clearForm = () => {
    setForm({} as T);
  };

  return {form, setFormField, setFormValue, setMultipleFormField, clearForm};
};
