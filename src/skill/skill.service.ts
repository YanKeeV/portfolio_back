import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from '../interfaces/skill.interface';

@Injectable()
export class SkillService {
    constructor(@InjectModel('Skill') private readonly skillModel: Model<Skill>) {}

    async getSkills(): Promise<Skill[]> {
        return this.skillModel.find().exec();
    }

    async createSkill(skill: Skill): Promise<Skill> {
        const newSkill = new this.skillModel(skill);
        return newSkill.save();
    }

    async deleteSkill(skillID): Promise<any> {
        const deletedSkill = await this.skillModel.findByIdAndDelete(skillID)
        return deletedSkill;
    }
}