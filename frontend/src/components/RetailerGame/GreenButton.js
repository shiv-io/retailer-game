import React from 'react';
import { Button } from 'gestalt';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  > button {
    background-color: #0fa573;
    :hover, :focus {
      background-color: #0fa573;
    }
  }
`;

const GreenButton = (props) => {
  return (
    <ButtonContainer>
      <Button {...props} textColor="white" />
    </ButtonContainer>
  );
};

export { GreenButton };
export default GreenButton;
