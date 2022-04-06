import { Router } from 'express';
import AgentController from '../controllers/agent.controller'

const router = Router();
const module = "agent";

router.post(
    '/',
    AgentController.create
);

router.get(
    '/',
    AgentController.index
);

router.get(
    '/:id',
    AgentController.get
);





export { module, router }