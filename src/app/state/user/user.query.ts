import { Injectable } from "@angular/core";
import { userStore } from "./user.store";

@Injectable({ providedIn: 'root' })
export class UserQuery {
    constructor() {}

    public subscribe = (cb: () => any) => {
        return userStore.subscribe(cb);
    }
}