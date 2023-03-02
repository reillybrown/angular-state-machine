import { Injectable } from "@angular/core";
import { select } from "@ngneat/elf";
import { getActiveEntities, getActiveEntity, getAllEntities, selectActiveEntities, selectActiveEntity, selectAllEntities } from "@ngneat/elf-entities";
import { Observable } from "rxjs";
import { IUserMetadata, User } from "./user.model";
import { userStore } from "./user.store";

@Injectable({ providedIn: 'root' })
export class UserQuery {
    constructor() {}

    get = (): IUserMetadata => {
        return userStore.getValue();
    }

    // TODO : confirm return type
    getAll = (): User[] => {
        return userStore.query(getAllEntities());
    }

    getActive = (): User | undefined => {
        return userStore.query(getActiveEntity());
    }

    select = (): Observable<IUserMetadata> => {
        return userStore.pipe(select((state) => state));
    }

    // TODO : confirm return types
    selectAll = (): Observable<User[]> => {
        return userStore.pipe(selectAllEntities());
    }

    selectActive = (): Observable<User | undefined> => {
        return userStore.pipe(selectActiveEntity());
    }
}