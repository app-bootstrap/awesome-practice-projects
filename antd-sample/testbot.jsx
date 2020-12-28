import React, { useEffect } from 'react';
import { Button } from 'antd';
import AssistantBoard from 'debugger-board/src/App.jsx';

const { pathname } = window.location;

const TestBot = () => {
  const refresh = () => {
    const cov = window.__coverage;
    fetch(`/_coverage?pathname=${pathname}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: cov,
    }).then(() => {
      const iframe = document.querySelector('#cov_iframe');
      iframe.contentWindow.location.reload();
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const drawerContent = () => {
    return (
      <div style={{ height: '100%' }}>
        <Button
          onClick={e => {
            e.stopPropagation();
            refresh();
          }}
          type="primary"
          size="small"
        >
          refresh
        </Button>
        <iframe
          id="cov_iframe"
          src={`/_coverage?pathname=${pathname}`}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </div>
    );
  };
  return (
    <AssistantBoard
      toolbarIcon="https://macacajs.github.io/logo/macaca.svg"
      drawerContent={drawerContent()}
    />
  );
};

export default TestBot;
