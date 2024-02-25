import { Controller, Get, Param, Post, Body, Delete, Res, Query, NotFoundException, HttpStatus } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from '../schemas/experience.schema';

@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get('/get')
  findAll(): Promise<Experience[]> {
    return this.experienceService.getExperiences();
  }

  @Post('/post')
  createExperience(@Body() experience: Experience): Promise<Experience> {
    return this.experienceService.createExperience(experience);
  }

  @Delete('/delete')
  async deleteExperience(@Res() res, @Query('experienceID') experienceID: string) {
    const deletedExperience = await this.experienceService.deleteExperience(experienceID);
    if (!deletedExperience) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Experience has been deleted!',
      post: deletedExperience
    })
  }
}