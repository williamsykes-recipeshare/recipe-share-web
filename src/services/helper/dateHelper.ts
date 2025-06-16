import moment from 'moment';

export default class DateFormatHelper {
    public static ddMMyyyy(date : string | number | moment.Moment | null) : string {
        if (date === null) return '';
        if (!date) return 'Invalid';
        return moment.utc(date).local().format('DD/MM/YYYY');
    }

    public static ddMM(date : string | number | moment.Moment | null) : string {
        if (!date) return 'Invalid';
        return moment.utc(date).local().format('DD-MM');
    }

    public static ddMMyyyyHHmm(date : string | number | moment.Moment | null) : string {
        if (!date) return 'Invalid';
        return moment.utc(date).local().format('DD-MM-YYYY HH:mm');
    }

    public static MMMYYYY(date : string | number | moment.Moment | null) : string {
        if (!date) return 'Invalid';
        return moment.utc(date).local().format('MMM YYYY');
    }

    public static DDMMMYYYY(date : string | number | moment.Moment | null) : string {
        if (!date) return 'Invalid';
        return moment.utc(date).local().format('DD MMM YYYY');
    }

    public static DDMMMMYYYY(date : string | number | moment.Moment | null) : string {
        if (!date) return 'Invalid';
        return moment.utc(date).local().format('DD MMMM YYYY');
    }

    public static YYYYMMDD(date : string | number | moment.Moment | null) : string {
        if (!date) return 'Invalid';
        return moment.utc(date).local().format('YYYY-MM-DD');
    }

    public static YYYYMMDDF(date : string | number | moment.Moment | null) : string {
        if (!date) return 'Invalid';
        return moment.utc(date).local().format('YYYY/MM/DD');
    }

    public static getDate(date : string | number | moment.Moment | null) : Date | null {
        if (!date) return null;
        return moment.utc(date).local().toDate();
    }
}