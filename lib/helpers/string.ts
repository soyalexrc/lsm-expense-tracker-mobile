export function textShortener(txt: string, limit = 10): string {
    return txt?.length > limit ? txt.substring(0, 9).concat('...') : txt;
}

export function formatAmountToNumber(numberString: string): number {
    return Number(numberString.replace(/,/g, ''));
}

export function formatByThousands(value: string) {
    const decimals = value.split('.')[1] ?? '';
    const rawValue = value.split('.')[0];
    const valueWithCommas = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Regex for comma separators

    return valueWithCommas + (decimals && '.' + decimals);
}
