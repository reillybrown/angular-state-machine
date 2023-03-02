interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: number; // in seconds (epoch)
    homeAddressId: number;
}

interface IAddress {
    street: string;
    street2: string;
    city: string;
    state: string;
    zipCode: number;
}

interface IListUsersRequest {
    firstName: string;
    lastName: string;
    dateOfBirth: number;
}

export {
    IUser,
    IAddress,
    IListUsersRequest
};