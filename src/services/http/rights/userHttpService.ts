import axios, { AxiosResponse, CancelTokenStatic } from 'axios';
import { IUserRegistrationFormValue } from '../../../models/rights/user';

export default class UserHttpService {
    private static readonly CancelToken : CancelTokenStatic = axios.CancelToken;

    public static register(
        registration : IUserRegistrationFormValue,
    ) : Promise<AxiosResponse> {
        const form = new FormData();
        form.append('Email', registration.email);
        form.append('Password', registration.password);
        form.append('Name', `${registration.name} ${registration.surname}`);
        form.append('NameOfOrganisation', registration.nameOfOrganisation);
        form.append('TypeOfOrganisation', `${registration.typeOfOrganisation}`);
        form.append('TypeOfOrganisationOther', registration.typeOfOrganisationOther ?? '');
        form.append('Sector', `${registration.sector}`);
        form.append('SectorOther', registration.sectorOther ?? '');
        form.append('RoleText', registration.roleText ?? '');

        // We use create here to make sure axios does not try and send an expired token or
        // any other headers not needed, basically to ignore the interceptors.
        return axios.create({
            baseURL: API_URL,
        }).post('api/v1/User/Register', form);
    }
}