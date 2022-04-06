import response from "../utils/responses"
import { Issue, SupportAgent} from "../db/models"
import randomstring from "randomstring"
import { IssueCreateSchema, IssueUpdateSchema, IssueAssignSchema, IssueResolveSchema } from '../validations/issue.validation'

export default class {
    static async create(req, res) {
        const { error, value} = IssueCreateSchema.validate(req.body);
        if (error) {
           return res.status(400).json(response.error(400, error.details[0].message))
        }
       try {
           // find free agent
        const findActiveAgent = await SupportAgent.findOne({
            where: {
                status: "free"
            }
        })
        // check if agent is active and no unresolved issues
        if (findActiveAgent) {
            const issueNo = randomstring.generate({
                length: 5,
                charset: 'numeric'
            })
               const issueObject = {
                   ...req.body,
                   issueNo: `#${issueNo}`,
                   assignedTo: findActiveAgent.id
               }
               
               const newIssue = await Issue.create(issueObject)
               // update agent availabilty
               const agent = await SupportAgent.update({ status: "busy" }, {
                where: {
                    id: findActiveAgent.id
                }
            })
    
              return res.status(200).json(response.success(200, 'Issue submitted successful', newIssue))
        }
        // if not proceed to create an unassigned issue
        const issueNo = randomstring.generate({
            length: 5,
            charset: 'numeric'
        })
           const issueObject = {
               ...req.body,
               issueNo: `#${issueNo}`
           }
           
           const newIssue = await Issue.create(issueObject)

          return res.status(200).json(response.success(200, 'Issue submitted successful', newIssue))
            
       } catch (error) {
           console.log(error)
           res.status(500).json(response.error(500, "error"))
       }
    }

    static async index(req, res) {
        try {
            const getIssues = await Issue.findAll({});
            return res.status(200).json(response.success(200, 'Issue fetched successful', getIssues))
        } catch (error) {
            res.status(500).json(response.error(500, "error"))
        }
    }

    static async get(req, res) {
        const { id } = req.params
        try {
            const getIssue = await Issue.findOne({
                where: {
                    id
                }
            });
            return res.status(200).json(response.success(200, 'Issue fetched successful', getIssue))
        } catch (error) {
            res.status(500).json(response.error(500, "error"))
        }
    }

    static async edit(req, res) {
        const { error, value} = IssueUpdateSchema.validate(req.body);
        if (error) {
           return res.status(400).json(response.error(400, error.details[0].message))
        }
        try {
            const { id } = req.params
            const updateBody = {
                ...req.body
            }
            const issue = await Issue.update(updateBody,{
                where: {
                    id
                }
            });
            return res.status(200).json(response.success(200, 'Issue edited successful', issue))
        } catch (error) {
            res.status(500).json(response.error(500, "error"))
        }

    }

    static async resolveIssue(req, res) {
        const { error, value} = IssueResolveSchema.validate(req.body);
        if (error) {
           return res.status(400).json(response.error(400, error.details[0].message))
        }
        const { issueId, agentId } = req.body;
        try {
           //update Issue status
            const issue = await Issue.update({ status: 'resolved'},{
                where: {
                    id: issueId,
                    assignedTo: agentId
                }
            });

            // agent is free at this point proceed to find unassigned issues
            const unassignedIssues = await Issue.findOne({
                where: {
                    status: 'unresolved',
                    assignedTo: null
                }
            });

            if (unassignedIssues) {
                // proceed to assign issue to this agent
                const issue = await Issue.update({ assignedTo: agentId },{
                    where: {
                        id: unassignedIssues.id
                    }
                });
                return res.status(200).json(response.success(200, 'Issue edited successful', issue))
            }

            //update agent availability
            const agent = await SupportAgent.update({ status: "free"}, {
                where: {
                    id: agentId
                }
            })


            return res.status(200).json(response.success(200, 'Issue edited successful', issue))
        } catch (error) {
            res.status(500).json(response.error(500, "error"))
        }

    }

    static async assignIssue(req, res) {
        const { error, value} = IssueAssignSchema.validate(req.body);
        if (error) {
           return res.status(400).json(response.error(400, error.details[0].message))
        }
        const { issueId, agentId  } = req.body;
        try {
        // check agent status
        const findActiveAgent = await SupportAgent.findOne({
            where: {
                status: "free",
                id: agentId
            }
        });

        if (!findActiveAgent) {
            return  res.status(400).json(response.error(400, `Can not assign issue with id: ${issueId} to agent, agent is currently busy`))

        }
        const issue = await Issue.update({ assignedTo: findActiveAgent.id },{
            where: {
                id: issueId
            }
        });
        // update agent status 
        const updateAgent = await SupportAgent.update({ status: "busy"}, {
            where: {
                id: agentId
            }
        })
        
        return res.status(200).json(response.success(200, 'Issue assigned successfully', issue))
   
        } catch (error) {
            res.status(500).json(response.error(500, "error"))
        }

    }


}