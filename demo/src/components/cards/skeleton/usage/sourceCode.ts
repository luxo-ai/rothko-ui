export const SKELETON_BOX = `
import { SkeletonBox } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return <SkeletonBox width={200} speed={1 / 1.5} />;
};

export default App;
`;
export const SKELETON_BOX_WITH_LABEL = `
import { SkeletonBoxWithLabel } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return <SkeletonBoxWithLabel width={200} speed={1 / 1.5} />;
};

export default App;
`;
export const SKELETON_BUILDER = `
import { SkeletonBuilder } from '@rothko-ui/react';
import React from 'react';

const App = () => {
  return (
    <SkeletonBuilder speed={1} width={200} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M22 12A10 10 0 0 0 12 2a10 10 0 0 0 0 20 10 10 0 0 0 10-10zm-2.07-1H17a12.91 12.91 0 0 0-2.33-6.54A8 8 0 0 1 19.93 11zM9.08 13H15a11.44 11.44 0 0 1-3 6.61A11 11 0 0 1 9.08 13zm0-2A11.4 11.4 0 0 1 12 4.4a11.19 11.19 0 0 1 3 6.6zm.36-6.57A13.18 13.18 0 0 0 7.07 11h-3a8 8 0 0 1 5.37-6.57zM4.07 13h3a12.86 12.86 0 0 0 2.35 6.56A8 8 0 0 1 4.07 13zm10.55 6.55A13.14 13.14 0 0 0 17 13h2.95a8 8 0 0 1-5.33 6.55z" />
    </SkeletonBuilder>
  );
};

export default App;
`;
