import { Document } from 'mongoose';

export interface Project extends Document {
    readonly name: string;
    readonly stack: string;
    readonly image: string;
    readonly description: string;
    readonly projectHref: string;
    readonly githubHref: string;
}