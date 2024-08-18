// ui/Switch.js
import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  appearance: none;
  background-color: #ccc;
  border-radius: 15px;
  width: 50px;
  height: 25px;
  position: relative;
  cursor: pointer;
  outline: none;

  &:checked {
    background-color: #4caf50;
  }

  &:before {
    content: '';
    position: absolute;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: white;
    top: 2.5px;
    left: 2.5px;
    transition: transform 0.2s;
  }

  &:checked:before {
    transform: translateX(25px);
  }
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 14px;
`;

const Switch = ({ checked, onChange, label, disabled }) => {
  return (
    <SwitchContainer>
      <Input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <Label>{label}</Label>
    </SwitchContainer>
  );
};

export default Switch;
