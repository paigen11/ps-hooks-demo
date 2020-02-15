import React, { useState } from 'react';

export const useFormInput = () => {
  const [value, setValue] = useState('');
  const [validity, setValidity] = useState(false);

  const inputChangeHandler = e => {
    setValue(e.target.value);
    if (e.target.value.trim() === '') {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  return { value, onChange: inputChangeHandler, validity };
};
