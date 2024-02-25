import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Language extends Document {
    @Prop()
    name: string;

    @Prop()
    level: string;

    @Prop()
    description: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);