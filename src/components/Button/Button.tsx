import React from 'react';

export type ButtonProps = {
  label: string;
};

export function Button(props: ButtonProps) {
  return <button>{props.label}</button>;
}
