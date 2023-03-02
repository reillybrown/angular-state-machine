import { Injectable } from "@angular/core";
import { v1 } from "@contracts";
import { LoggerService } from '@shared/services/logger.service';
import { environment } from "src/environments/environment";

interface IInvokeParams {
    method: 'GET' | 'PATCH' | 'POST';
    endpoint: string;
}

const TEST_USERS: v1.IUser[] = [
    {
        firstName: 'Nikola',
        lastName: 'Tesla',
        dateOfBirth: -3580944239,
        homeAddressId: 1
    },
    {
        firstName: 'Thomas',
        lastName: 'Edison',
        dateOfBirth: -3877901039,
        homeAddressId: 2
    }
];

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private url: string;

    constructor(
        private logger: LoggerService
    ) {
        this.url = environment.apiUrl;
    }

    protected invoke = async (params: IInvokeParams): Promise<any> => {
        const requestUrl = [
            this.url,
            params.endpoint
        ].join('');
        this.logger.verbose(`Requesting URL: ${requestUrl}`);
        // TODO : implement
    }

    // ******************************************************
    // *
    // * Custom Call Creation Below
    // *
    // ******************************************************

    listUsers = async (request: v1.IListUsersRequest): Promise<v1.IUser[]> => {
        this.invoke({
            method: 'GET',
            endpoint: '/users'
        });
        return TEST_USERS;
    }

    getUser = async (id: number): Promise<v1.IUser | undefined> => {
        return TEST_USERS.find(user => user.id === id);
    }
}