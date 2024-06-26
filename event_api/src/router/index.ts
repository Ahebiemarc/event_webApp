import express from 'express';

import authentication from './authentication';
import users from './user';
import review from './review';
import event from './event';
import adhesion from './adhesion';

const router = express.Router();

export default (): express.Router =>{
    authentication(router);
    users(router);
    event(router);
    review(router);
    adhesion(router);
    return router;
}