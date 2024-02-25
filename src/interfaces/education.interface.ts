import { Document } from 'mongoose';

export interface Education extends Document {
    readonly place: string;
    readonly specialization: string;
    readonly timePeriod: string;
    readonly description: string;
}