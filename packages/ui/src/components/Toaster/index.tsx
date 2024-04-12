import { useContext } from 'react';
import Toast from './Toaster';
import ToasterContext from './ToasterContext';
import ToasterContextProvider from './ToasterContextProvider';

const ToasterContextConsumer = ToasterContext.Consumer;
const useToaster = () => useContext(ToasterContext);

export { Toast, ToasterContextConsumer, useToaster, ToasterContextProvider };
