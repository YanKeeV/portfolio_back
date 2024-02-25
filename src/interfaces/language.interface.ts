import { Document } from 'mongoose';

export interface Language extends Document {
    readonly name: string;
    readonly level: string;
    readonly description: string;
}