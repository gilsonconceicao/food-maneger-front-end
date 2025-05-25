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