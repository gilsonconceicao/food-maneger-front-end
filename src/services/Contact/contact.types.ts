import { ModelBase } from "../@types/generic";

export type ContactModel = {
  name: string;
  email: string;
  message: string;
  phoneNumber: string;
} & ModelBase;

export type ContactCreateDTO = {
  name: string;
  email: string;
  message: string;
  phoneNumber: string;
}