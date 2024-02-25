import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Experience extends Document {
    @Prop()
    place: string;

    @Prop()
    role: string;

    @Prop()
    timePeriod: string;

    @Prop()
    description: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);