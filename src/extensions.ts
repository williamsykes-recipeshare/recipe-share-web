import moment from 'moment';

declare module 'moment' {
    // tslint:disable-next-line: interface-name
    export interface Moment {
        asUTC() : moment.Moment;
    }
}

moment.prototype.asUTC = function () : moment.Moment {
    const self = this as moment.Moment;
    return moment.utc(self.format('YYYY-MM-DD HH:mm'), 'YYYY-MM-DD  HH:mm');
};

declare global {
    interface String {
        toTitleCase() : string;
        splitCamelCase() : string;
        zeroStartPad(size : number) : string;
    }

    interface Number {
        zeroStartPad(size : number) : string;
        toLocaleFormat(
            locale ?: string,
            options ?: Intl.NumberFormatOptions,
        ) : string;
        toLocaleCurrency(
            currency ?: string,
            locale ?: string,
            options ?: Intl.NumberFormatOptions,
        ) : string;
    }
}

String.prototype.toTitleCase = function () : string {
    const splitStrings = String(this).split(' ');
    const result : Array<string> = [];
    splitStrings.forEach((n) => {
        if (n.length > 0) {
            result.push(n[0].toLocaleUpperCase() + n.substring(1).toLocaleLowerCase());
        }
    });

    return result.join(' ');
};

String.prototype.splitCamelCase = function () : string {
    return this.split(/(?=[A-Z])/).join(' ');
};

String.prototype.zeroStartPad = function (size : number) : string {
    return this.padStart(size, '0');
};

Number.prototype.zeroStartPad = function (size : number) : string {
    return this.toString().zeroStartPad(size);
};

Number.prototype.toLocaleCurrency = function (
    currency = 'AUD',
    locale = 'en-au',
    options ?: Intl.NumberFormatOptions,
) : string {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            ...options,
        }).format(Number(this));
    } catch (ex) {
        console.error(ex);
    }

    return '';
};

Number.prototype.toLocaleFormat = function (
    locale = 'en-au',
    options ?: Intl.NumberFormatOptions,
) : string {
    return new Intl.NumberFormat(locale, {
        style: 'decimal',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        ...options,
    }).format(Number(this));
};
