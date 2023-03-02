import { v1 } from "@contracts";

export type User = v1.IUser;

export function createUser(params: Partial<User>) {
    return {
        id: null,
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        homeAddressId: null,
        ...params
    } as User;
}

export interface IUserMetadata {
    search: ISearchParams;
    createdIds: number[];
    updatedIds: number[];
    deletedIds: number[];
}

interface ISearchParams {

}

export const createUserMetadata = (params: Partial<IUserMetadata>): IUserMetadata => {
    return {
        search: {},
        createdIds: [],
        updatedIds: [],
        deletedIds: [],
    };
}