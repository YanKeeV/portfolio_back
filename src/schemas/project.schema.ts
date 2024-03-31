import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
    @Prop()
    name: string;

    @Prop()
    stack: string;

    @Prop()
    image: string;

    @Prop()
    description: string;

    @Prop()
    projectHref: string;

    @Prop()
    githubHref: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);