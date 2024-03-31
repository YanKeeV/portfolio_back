import { Controller, Get, Param, Post, Body, Delete, Res, Query, NotFoundException, HttpStatus, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '../schemas/project.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/get')
  findAll(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @UseGuards(AuthGuard()) 
  @Post('/post')
  createProject(@Body() project: Project): Promise<Project> {
    return this.projectService.createProject(project);
  }

  @UseGuards(AuthGuard()) 
  @Delete('/delete')
  async deleteProject(@Res() res, @Query('projectID') projectID: string) {
    const deletedProject = await this.projectService.deleteProject(projectID);
    if (!deletedProject) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Education has been deleted!',
      post: deletedProject
    })
  }
}