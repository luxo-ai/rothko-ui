import React from 'react';

import ErrorPage from '../components/ErrorPage';

const BadGatewayPage = () => <ErrorPage code={404} header="Bad Gateway" />;

export default BadGatewayPage;
