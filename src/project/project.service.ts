import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../interfaces/project.interface';

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}

    async getProjects(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }

    async createProject(project: Project): Promise<Project> {
        const newProject = new this.projectModel(project);
        return newProject.save();
    }

    async deleteProject(projectID): Promise<any> {
        const deletedProject = await this.projectModel.findByIdAndDelete(projectID)
        return deletedProject;
    }
}