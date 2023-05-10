import DemoError from '../components/DemoError';
import React from 'react';

const BadGatewayPage = () => <DemoError code={404} header="Bad Gateway" />;

export default BadGatewayPage;
