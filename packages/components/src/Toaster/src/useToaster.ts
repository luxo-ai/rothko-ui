import { useContext } from 'react';
import ToasterContext from './ToasterContext';

const useToaster = () => useContext(ToasterContext);
export default useToaster;
