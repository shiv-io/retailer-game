import React from 'react';
import { Modal, Button, Box } from 'gestalt';
import { render, unmountComponentAtNode } from 'react-dom';

const ConfirmModal = ({ heading, children, onCancel, onConfirm }) => (
  <Modal
    accessibilityModalLabel="Are you sure?"
    heading={heading}
    onDismiss={onCancel}
    footer={
      <Box
        display="flex"
        marginLeft={-1}
        marginRight={-1}
        justifyContent="center"
      >
        <Box padding={1}>
          <Button size="lg" color="blue" text="確認" onClick={onConfirm} />
        </Box>
        <Box padding={1}>
          <Button size="lg" text="取消" onClick={onCancel} />
        </Box>
      </Box>
    }
    role="alertdialog"
    size="sm"
  >
    <Box paddingX={8}>{children}</Box>
  </Modal>
);

const showConfirmDialog = ({ heading, content }) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const confirmation = new Promise((resolve) => {
    render(
      <ConfirmModal
        heading={heading}
        onCancel={() => resolve(null)}
        onConfirm={() => resolve(true)}
      >
        {content}
      </ConfirmModal>,
      container,
    );
  });

  return confirmation.finally(() => {
    unmountComponentAtNode(container);
    document.body.removeChild(container);
  });
};

export { showConfirmDialog };
export default showConfirmDialog;
