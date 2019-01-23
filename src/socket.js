import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import config from './config';

const socket = io(config.apiHost);
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

export default socketIoMiddleware;
