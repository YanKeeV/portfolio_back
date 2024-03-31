import { Controller, Get, Param, Post, Body, Delete, Res, Query, NotFoundException, HttpStatus, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { Education } from '../schemas/education.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('educations')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get('/get')
  findAll(): Promise<Education[]> {
    return this.educationService.getEducations();
  }

  @UseGuards(AuthGuard()) 
  @Post('/post')
  createEducation(@Body() education: Education): Promise<Education> {
    return this.educationService.createEducation(education);
  }

  @UseGuards(AuthGuard()) 
  @Delete('/delete')
  async deleteEducation(@Res() res, @Query('educationID') educationID: string) {
    const deletedEducation = await this.educationService.deleteEducation(educationID);
    if (!deletedEducation) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Education has been deleted!',
      post: deletedEducation
    })
  }
}