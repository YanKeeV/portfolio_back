import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from '../interfaces/education.interface';

@Injectable()
export class EducationService {
    constructor(@InjectModel('Education') private readonly educationModel: Model<Education>) {}

    async getEducations(): Promise<Education[]> {
        return this.educationModel.find().exec();
    }

    async createEducation(education: Education): Promise<Education> {
        const newEducation = new this.educationModel(education);
        return newEducation.save();
    }

    async deleteEducation(educationID): Promise<any> {
        const deletedEducation = await this.educationModel.findByIdAndDelete(educationID)
        return deletedEducation;
    }
}