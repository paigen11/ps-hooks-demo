import { createContext } from 'react';

const authContext = createContext({ status: false, login: () => {} });

export default authContext;
