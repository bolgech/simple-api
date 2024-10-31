import {CommonController} from "../../Common/controllers/common.controller";
import {Application, NextFunction, Request, Response} from "express";
import {Delete, Get, Post, Put} from "../../Common/decorators/methods";
import Task from "../services/task.model";
import {Op} from "sequelize";

export class TaskController extends CommonController{
    constructor(app: Application) {
        super(app);
    }
    @Get('/api/v1/tasks','jwt')
    async getAllTasks(req: Request, res: Response, next: NextFunction){
        try {

            const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
            const offset = req.query.offset ? parseInt(req.query.offset as string) : null;
            const title = req.query.title;
            const description = req.query.description;
            const status = req.query.status;
            const options:any = {

            }
            if(limit){
                options.limit =limit
            }
            if(offset){
                options.offset =offset
            }
            const where:any = {};

            if(title){
                where.title = {
                    [Op.like]:`%${title}%`
                }
            }
            if(description){
                where.description = {
                    [Op.like]:`%${description}%`
                }
            }
            if(status){
                where.status = {
                    [Op.like]:`%${status}%`
                }
            }
            if(Object.entries(where).length>0){
                options.where = where;
            }
            const tasks = await Task.findAll(options);
            return res.status(200).json({data: tasks, success: true})
        } catch (e) {
            return res.status(500).json({error: e});
        }
    }
    @Get('/api/v1/task/:taskId','jwt')
    async getTask(req: Request, res: Response, next: NextFunction){
        try {
            const task = await Task.findByPk(req.params.taskId);
            if (!task) {
                return res.status(404).json({error: 'Task not found', success: false});
            }
            return res.status(200).json({data: task, success: true});
        } catch (e) {
            return res.status(500).json({error: e});
        }
    }
    @Post('/api/v1/tasks','jwt')
    async createTask(req: Request, res: Response, next: NextFunction){
        try {
            await Task.create(req.body);
            return res.status(201).json({success: true});
        } catch (e) {
            return res.status(500).json({error: e});
        }
    }
    @Put('/api/v1/tasks/:taskId','jwt')
    async updateTask(req: Request, res: Response, next: NextFunction){
        try {
            await Task.update(req.body, {where: {id: req.params.taskId}});
            return res.status(200).json({data: 'updated task', success: true});
        } catch (e) {
            return res.status(500).json({error: e});
        }
    }
    @Put('/api/v1/tasks/:taskId/status','jwt')
    async setTaskStatus(req: Request, res: Response, next: NextFunction){
        try {
            await Task.update({status:req.body?.status}, {where: {id: req.params.taskId}});
            return res.status(200).json({data: 'updated task', success: true});
        } catch (e) {
            return res.status(500).json({error: e});
        }
    }
    @Delete('/api/v1/tasks/:taskId','jwt')
    async deleteTask(req: Request, res: Response, next: NextFunction){
        try {
            await Task.destroy({where: {id: req.params.taskId}});
            return res.status(200).json({success: true});
        } catch (e) {
            return res.status(500).json({error: e});
        }
    }
}