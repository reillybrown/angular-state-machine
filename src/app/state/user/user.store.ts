import { User, IUserMetadata, createUserMetadata } from "./user.model";
import { createStore, withProps } from "@ngneat/elf";
import { withActiveIds, withEntities } from "@ngneat/elf-entities";

const userStore = createStore(
    { name: 'user-store' },
    withProps<IUserMetadata>(createUserMetadata({})),
    withEntities<User>({ idKey: 'id', initialValue: [] }),
    withActiveIds()
);

export {
    userStore
};