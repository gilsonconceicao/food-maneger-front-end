import {StringSchema} from 'yup';
import { registrationNumberValidate } from '../Validations/registrationNumberValidate';

declare module 'yup' {
    interface StringSchema {
        registrationNumberValidate(): StringSchema;
        phoneNumberValidate(): StringSchema;
    }
}

StringSchema.prototype.registrationNumberValidate = function () {
    return this.test('registrationNumberValidate', 'CPF informado é inválido', function (value) {
        if (!value) {
            return true;
        }
        return registrationNumberValidate(value);
    });
};

StringSchema.prototype.phoneNumberValidate = function () {
    return this.test('phoneNumberValidate', 'Número de telefone inválido', function (value) {
        if (!value) {
            return true;
        }
        return validatePhoneNumber(value);
    });
};

function validatePhoneNumber(phone: string): boolean {
    const cleanedPhone = phone.replace(/\D/g, ''); 
    const phoneRegex = /^\d{11}$/; 
    return phoneRegex.test(cleanedPhone);
}