import React, {useState} from "react";

export const useFormInput = (initial: string) => {
  const [value, setValue] = useState(initial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return {value, handleChange};
}