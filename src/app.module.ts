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

import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { ProjectSchema } from './schemas/project.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.backend.env',
    }),
    MongooseModule.forRoot(''),
    MongooseModule.forFeature([
      { name: 'Education', schema: EducationSchema },
      { name: 'Experience', schema: ExperienceSchema },
      { name: 'Skill', schema: SkillSchema },
      { name: 'Language', schema: LanguageSchema },
      { name: 'Project', schema: ProjectSchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, EducationController, ExperienceController, SkillController, LanguageController, ProjectController],
  providers: [AppService, EducationService, ExperienceService, SkillService, LanguageService, ProjectService],
})
export class AppModule {}