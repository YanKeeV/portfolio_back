import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from '../interfaces/experience.interface';

@Injectable()
export class ExperienceService {
    constructor(@InjectModel('Experience') private readonly experienceModel: Model<Experience>) {}

    async getExperiences(): Promise<Experience[]> {
        return this.experienceModel.find().exec();
    }

    async createExperience(experience: Experience): Promise<Experience> {
        const newExperience = new this.experienceModel(experience);
        return newExperience.save();
    }

    async deleteExperience(experienceID): Promise<any> {
        const deletedExperience = await this.experienceModel.findByIdAndDelete(experienceID)
        return deletedExperience;
    }
}