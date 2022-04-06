import response from "../utils/responses"
import { SupportAgent } from "../db/models"

export default class {
    static async create(req, res) {
        // const { error, value} = IssueCreateSchema.validate(req.body);
        // if (error) {
        //    return res.status(400).json(response.error(400, error.details[0].message))
        // }
       try {

           const agentObject = {
               ...req.body,
           }
           
           const newAgent = await SupportAgent.create(agentObject)

          return res.status(200).json(response.success(200, 'Agent created successful', newAgent))
            
       } catch (error) {
           console.log(error)
           res.status(500).json(response.error(500, "error"))
       }
    }

    static async index(req, res) {
        try {
            const getAgents = await SupportAgent.findAll({});
            return res.status(200).json(response.success(200, 'Agent fetched successful', getAgents))
        } catch (error) {
            res.status(500).json(response.error(500, "error"))
        }
    }

    static async get(req, res) {
        const { id } = req.params
        try {
            const getAgent = await SupportAgent.findOne({
                where: {
                    id
                }
            });
            return res.status(200).json(response.success(200, 'Agent fetched successful', getAgent))
        } catch (error) {
            res.status(500).json(response.error(500, "error"))
        }
    }

    


}