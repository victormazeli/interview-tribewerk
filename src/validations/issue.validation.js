import Joi from 'joi';


const IssueCreateSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    subject: Joi.string().required(),
    statement: Joi.string().required(),
    status: Joi.number().integer(),
    assignedTo: Joi.number().integer(),
    issueNo: Joi.string()

});

const IssueUpdateSchema = Joi.object({
    userEmail: Joi.string().email(),
    subject: Joi.string(),
    statement: Joi.string(),
    status: Joi.number().integer(),
    assignedTo: Joi.number().integer(),
    issueNo: Joi.string()

});

const IssueResolveSchema = Joi.object({
    issueId: Joi.number().integer().required(),
    agentId: Joi.number().integer().required(),

});

const IssueAssignSchema = Joi.object({
    issueId: Joi.number().integer(),
    agentId: Joi.number().integer(),

});

export { IssueCreateSchema,  IssueUpdateSchema, IssueAssignSchema, IssueResolveSchema }