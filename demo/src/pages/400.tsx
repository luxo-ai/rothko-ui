import ErrorPage from '../components/ErrorPage';
import React from 'react';

const BadRequest = () => <ErrorPage code={400} header="Bad Request" />;

export default BadRequest;
