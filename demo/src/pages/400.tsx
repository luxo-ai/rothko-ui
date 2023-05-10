import DemoError from '../components/DemoError';
import React from 'react';

const BadRequest = () => <DemoError code={400} header="Bad Request" />;

export default BadRequest;
