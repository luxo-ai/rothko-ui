import ErrorPage from '../components/ErrorPage';
import React from 'react';

const BadGatewayPage = () => <ErrorPage code={404} header="Bad Gateway" />;

export default BadGatewayPage;
