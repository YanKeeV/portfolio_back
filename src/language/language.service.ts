import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from '../interfaces/language.interface';

@Injectable()
export class LanguageService {
    constructor(@InjectModel('Language') private readonly languageModel: Model<Language>) {}

    async getLanguages(): Promise<Language[]> {
        return this.languageModel.find().exec();
    }

    async createLanguage(language: Language): Promise<Language> {
        const newLanguage = new this.languageModel(language);
        return newLanguage.save();
    }

    async deleteLanguage(languageID): Promise<any> {
        const deletedLanguage = await this.languageModel.findByIdAndDelete(languageID)
        return deletedLanguage;
    }
}