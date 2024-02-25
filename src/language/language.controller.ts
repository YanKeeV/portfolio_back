import { Controller, Get, Param, Post, Body, Delete, Res, Query, NotFoundException, HttpStatus } from '@nestjs/common';
import { LanguageService } from './language.service';
import { Language } from '../schemas/language.schema';

@Controller('Languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get('/get')
  findAll(): Promise<Language[]> {
    return this.languageService.getLanguages();
  }

  @Post('/post')
  createLanguage(@Body() language: Language): Promise<Language> {
    return this.languageService.createLanguage(language);
  }

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