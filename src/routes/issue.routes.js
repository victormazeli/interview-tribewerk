import { Router } from 'express';

import IssueController from '../controllers/issue.controller';

const router = Router();
const module = "issue";

router.post(
    '/',
    IssueController.create
);

router.post(
    '/resolve',
    IssueController.resolveIssue
);

router.post(
    '/assign',
    IssueController.assignIssue
);

router.get(
    '/',
    IssueController.index
);

router.get(
    '/:id',
    IssueController.get
);

router.put(
    '/:id',
    IssueController.edit
);

// router.delete(
//     '/:id',
//     generalMiddleware.controllerWrapper(
//         TicketController.edit,
//         "Error Deleting ticket"
//     )
// );



export { module, router }