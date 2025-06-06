import { urlImageDefault } from "@/constants/generic";

export function formatCurrencyInCents(value: number) {
    const convertFromString = value.toString();
    if (isNullOrEmpty(convertFromString))
        return "R$ 0,00"

    const currency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const valueFormted = parseFloat(convertFromString) / 100;
    return currency.format(valueFormted);
}

export function isNullOrEmpty(value?: string) {
    return value === null || value === undefined || String(value ?? "").length === 0;
}


export function renderUrlImageValidate(url?: string) {
    if (isNullOrEmpty(url)) return urlImageDefault;
    if (url?.startsWith('https://')) return url;
    else return `https://${url}`;
} 

export const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone;
};