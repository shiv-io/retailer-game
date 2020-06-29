import React from 'react';
import { Flyout, Layer, Text, Box } from 'gestalt';
import { render, unmountComponentAtNode } from 'react-dom';

const showTooltip = ({ anchor, content }) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const confirmation = new Promise((resolve) => {
    render(
      <Layer>
        <Flyout
          anchor={anchor}
          idealDirection="right"
          showCaret
          onDismiss={() => resolve()}
          positionRelativeToAnchor={false}
          color="darkGray"
          size={100}
        >
        <Box padding={3} column={12}>
          <Text align="center" color="white">
            {content}
          </Text>
          </Box>
        </Flyout>
      </Layer>,
      container,
    );
  });

  return confirmation.finally(() => {
    unmountComponentAtNode(container);
    document.body.removeChild(container);
  });
};

export { showTooltip };
export default showTooltip;
