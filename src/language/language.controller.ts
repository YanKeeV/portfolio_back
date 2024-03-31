import { Controller, Get, Param, Post, Body, Delete, Res, Query, NotFoundException, HttpStatus, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { Language } from '../schemas/language.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get('/get')
  findAll(): Promise<Language[]> {
    return this.languageService.getLanguages();
  }

  @UseGuards(AuthGuard())
  @Post('/post')
  createLanguage(@Body() language: Language): Promise<Language> {
    return this.languageService.createLanguage(language);
  }

  @UseGuards(AuthGuard())
  @Delete('/delete')
  async deleteLanguage(@Res() res, @Query('languageID') languageID: string) {
    const deletedLanguage = await this.languageService.deleteLanguage(languageID);
    if (!deletedLanguage) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Language has been deleted!',
      post: deletedLanguage
    })
  }
}