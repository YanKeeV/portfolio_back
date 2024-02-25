import { Controller, Get, Param, Post, Body, Delete, Res, Query, NotFoundException, HttpStatus } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from '../schemas/skill.schema';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get('/get')
  findAll(): Promise<Skill[]> {
    return this.skillService.getSkills();
  }

  @Post('/post')
  createSkill(@Body() skill: Skill): Promise<Skill> {
    return this.skillService.createSkill(skill);
  }

  @Delete('/delete')
  async deleteSkill(@Res() res, @Query('skillID') skillID: string) {
    const deletedSkill = await this.skillService.deleteSkill(skillID);
    if (!deletedSkill) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Skill has been deleted!',
      post: deletedSkill
    })
  }
}