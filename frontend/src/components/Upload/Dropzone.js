import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  background: #cfcfcf;
  padding: 10px;
  text-align: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  color: ${(props) => getColor(props)};
  outline: none;
  transition: border 0.24s ease-in-out;
  transition: color 0.24s ease-in-out;
  cursor: pointer;
`;

const Dropzone = ({ onDrop, text }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: ".csv,text/csv", multiple: false });

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <h3>{isDragReject ? 'Only allow one .csv a time' : text}</h3>
    </Container>
  );
};

export default Dropzone;
