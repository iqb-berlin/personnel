import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonDocument = PersonEntity & Document;

@Schema()
export class PersonEntity {
  @Prop({ required: true })
  forename: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  birthday: Date;
}

export const PersonSchema = SchemaFactory.createForClass(PersonEntity);
