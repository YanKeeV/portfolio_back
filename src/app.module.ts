import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EducationController } from './education/education.controller';
import { EducationService } from './education/education.service';
import { EducationSchema } from './schemas/education.schema';

import { ExperienceController } from './experience/experience.controller';
import { ExperienceService } from './experience/experience.service';
import { ExperienceSchema } from './schemas/experience.schema';

import { SkillController } from './skill/skill.controller';
import { SkillService } from './skill/skill.service';
import { SkillSchema } from './schemas/skill.schema';

import { LanguageController } from './language/language.controller';
import { LanguageService } from './language/language.service';
import { LanguageSchema } from './schemas/language.schema';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:m1r0sl4v@portfolio.hby09fk.mongodb.net/?retryWrites=true&w=majority&appName=portfolio'),
    MongooseModule.forFeature([
      { name: 'Education', schema: EducationSchema },
      { name: 'Experience', schema: ExperienceSchema },
      { name: 'Skill', schema: SkillSchema },
      { name: 'Language', schema: LanguageSchema },
    ]),
  ],
  controllers: [AppController, EducationController, ExperienceController, SkillController, LanguageController],
  providers: [AppService, EducationService, ExperienceService, SkillService, LanguageService],
})
export class AppModule {}