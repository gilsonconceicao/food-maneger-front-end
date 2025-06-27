import { BaseModel } from "../@types/generic";

export type ContactModel = {
  name: string;
  email: string;
  message: string;
  phoneNumber: string;
} & BaseModel;

export type ContactCreateDTO = {
  name: string;
  email: string;
  message: string;
  phoneNumber: string;
}