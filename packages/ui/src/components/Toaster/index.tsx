import { useContext } from 'react';
import Toast from './Toaster';
import ToasterContext from './ToasterContext';
import ToastContextProvider from './ToasterContextProvider';

const ToastContextConsumer = ToasterContext.Consumer;
const useToaster = () => useContext(ToasterContext);

export { Toast, ToastContextConsumer, useToaster, ToastContextProvider };
