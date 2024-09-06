import { createContext } from 'react';
import ModalService from './modal.service';

// @ts-expect-error - will be initialized in App
const ModalSvcContext = createContext<ModalService>(null);

export default ModalSvcContext;
