// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Education extends Document {
    @Prop()
    place: string;

    @Prop()
    specialization: string;

    @Prop()
    timePeriod: string;

    @Prop()
    description: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);