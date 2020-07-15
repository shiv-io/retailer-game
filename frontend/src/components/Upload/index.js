import React, { useCallback } from 'react';
import axios from 'axios';
import Dropzone from './Dropzone';
import { showConfirmDialog } from '../../utils/showConfirmDialog';

const file2form = (name) => (file) => {
  let formData = new FormData();
  formData.append(name, file, `${name}.csv`);
  return formData;
};

const Uploader = (props) => {
  const onDrop = useCallback((name) => (acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const formData = file2form(name)(file);
      await axios.post('/api/demands', formData);
      showConfirmDialog({ heading: '上傳成功', content: `已上傳 ${name}.csv 至伺服器` })
    });
  }, []);

  return (
    <>
      <Dropzone onDrop={onDrop('demands')} text="上傳需求表" />
      <Dropzone onDrop={onDrop('max')} text="上傳可能最大可能營收表" />
    </>
  );
};

export default Uploader;
