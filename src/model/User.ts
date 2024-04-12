import {  Schema, model } from 'mongoose';

interface IUser extends Document {
  nome: string,
  cognome: string,
  luogo_nascita: string,
  data_nascita: Date,
  comune_residenza: string,
  indirizzo_residenza: string,
  telefono: string,
  email: string,
  data_iscrizione: Date,
  consenso: boolean
  }

// Schema
const schema = new Schema({
  nome: { type: String, trim: true, required: true },
  cognome: { type: String, trim: true, required: true },
  luogo_nascita: { type: String, trim: true, required: true },
  data_nascita: { type : Date },
  comune_residenza: { type: String, trim: true, required: true },
  indirizzo_residenza: { type: String, trim: true, required: true },
  telefono: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  data_iscrizione: {type : Date, trim: true, default: Date.now()},
  consenso: { type: Boolean, trim: true },
});

// type TUser = InferSchemaType<typeof schema>;

// `UserModel` will have `name: string`, etc.
const User = model<IUser>('user', schema);
export default  User;