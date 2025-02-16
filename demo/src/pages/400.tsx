import React from 'react';

import ErrorPage from '../components/ErrorPage';

const BadRequest = () => <ErrorPage code={400} header="Bad Request" />;

export default BadRequest;
