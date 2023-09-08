import React from 'react';

export type InputProps = {
  placeholder: string;
};

export function Input(props: InputProps) {
  return <input placeholder={props.placeholder} />;
}
