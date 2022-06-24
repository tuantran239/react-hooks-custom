import React, { useState } from "react";
import { convertInputForm } from "../utils/convert";

export type ObjectInput = {
  [key: string]: string | number | null;
};

export type Input = string | number | ObjectInput | null;

export type EventInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type OnChangeFunc<E extends EventInput = any> = (
  e: React.ChangeEvent<E>
) => void;

const useChangeEvent = (input: Input) => {
  const [value, setValue] = useState<Input>(input);

  const onChangePrimitive: OnChangeFunc = (e) => {
    const inputValue = convertInputForm(e.target.value);
    setValue(inputValue);
  };

  const onChangeObject: OnChangeFunc = (e) => {
    setValue((pre: any) => {
      return { ...pre, [e.target.name]: convertInputForm(e.target.value) };
    });
  };

  const onChange: OnChangeFunc =
    typeof value === "string" || typeof value === "number"
      ? onChangePrimitive
      : onChangeObject;

  return { value, onChange };
};

export default useChangeEvent;
