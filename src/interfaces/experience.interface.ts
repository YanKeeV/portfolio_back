import { Document } from 'mongoose';

export interface Experience extends Document {
    readonly place: string;
    readonly role: string;
    readonly timePeriod: string;
    readonly description: string;
}