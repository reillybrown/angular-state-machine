import { Injectable } from "@angular/core";
import { createUser, User, IUserMetadata, createUserMetadata } from "./user.model";
import { userStore } from "./user.store";
import {
    addEntities,
    deleteAllEntities,
    deleteEntities,
    getEntity,
    setActiveIds,
    updateEntities,
    updateEntitiesIds
} from "@ngneat/elf-entities";
import { setProps } from "@ngneat/elf";
import { isNil } from 'lodash';
import { uuid } from '@shared/util/numbers';
import { LoggerService } from "@shared/services/logger.service";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private logger: LoggerService
    ) {}

    // ******************************************************
    // *
    // * Local interactions
    // *
    // ******************************************************

    /**
     * Adds one or more entities to the local store.
     * 
     * @param users 
     */
    add = (...users: Partial<User>[]) => {
        let { createdIds } = userStore.getValue();
        const newUsers = users.map(user => {
            if (isNil(user.id)) {
                user.id = uuid();
            }
            createdIds.push(user.id);
            return createUser(user);
        });
        this.logger.verbose('Adding new entities: ', newUsers);
        userStore.update(
            setProps({ createdIds }),
            addEntities(newUsers)
        );
    }

    /**
     * Sets the active entit(y/ies) in the local store.
     * 
     * @param ids 
     */
    setActive = (...ids: number[]) => {
        this.logger.verbose('Setting active ids: ', ids);
        userStore.update(
            setActiveIds(ids)
        );
    }

    /**
     * Updates a specific entity in the local store.
     * 
     * @param id 
     * @param user 
     */
    update = (id: number, user: Partial<User>) => {
        let { updatedIds } = userStore.getValue();
        if (updatedIds.indexOf(id) === -1) {
            updatedIds.push(id);
        }
        const oldUser = userStore.query(getEntity(id));
        const updatedUser = createUser({
            ...oldUser,
            ...user
        });
        this.logger.verbose('Updating entity: ', updatedUser);
        userStore.update(
            setProps({ updatedIds }),
            updateEntities(id, updatedUser)
        );
    }

    /**
     * Updates the id of a specific entity in the local store.
     * 
     * @param oldId 
     * @param newId 
     */
    updateId = (oldId: number, newId: number) => {
        let {
            createdIds,
            updatedIds,
            deletedIds
        } = userStore.getValue();
        let index: number;
        if ((index = createdIds.indexOf(oldId)) !== -1) {
            createdIds.splice(index, 1);
            createdIds.push(newId);
        } else if ((index = updatedIds.indexOf(oldId)) !== -1) {
            updatedIds.splice(index, 1);
            updatedIds.push(newId);
        } else if ((index = deletedIds.indexOf(oldId)) !== -1) {
            deletedIds.splice(index, 1);
            deletedIds.push(newId);
        }
        this.logger.verbose(`Changing id ${oldId} to ${newId}`);
        userStore.update(
            setProps({
                createdIds,
                updatedIds,
                deletedIds
            }),
            updateEntitiesIds(oldId, newId)
        );
    }

    /**
     * Updates the root metadata of the local store.
     * 
     * @param metadata 
     */
    updateRoot = (metadata: Partial<IUserMetadata>) => {
        this.logger.verbose('Updating store metadata: ', metadata);
        userStore.update(
            setProps(metadata)
        );
    }

    /**
     * Deletes an entity from the local store.
     * 
     * @param ids 
     */
    delete = (...ids: number[]) => {
        let { deletedIds } = userStore.getValue();
        ids.map(id => {
            if (deletedIds.indexOf(id) === -1) {
                deletedIds.push(id);
            }
        });
        this.logger.verbose('Deleting entities with ids: ', ids);
        userStore.update(
            setProps({ deletedIds }),
            deleteEntities(ids)
        );
    }

    /**
     * Resets the state of the local store.
     * 
     */
    reset = () => {
        this.logger.verbose('Resetting store state');
        // TODO : see if reset method is all thats needed
        // userStore.reset()
        userStore.update(
            setProps(createUserMetadata({})),
            deleteAllEntities()
        );
    }

    // ******************************************************
    // *
    // * API Interactions
    // *
    // ******************************************************

    /**
     * Commits all local changes to a pre-configured API.
     * 
     */
    commit = () => {
        const {
            createdIds,
            updatedIds,
            deletedIds
        } = userStore.getValue();
        this.logger.verbose('Committing store state:');
        this.logger.verbose('createdIds: ', createdIds);
        this.logger.verbose('updatedIds', updatedIds);
        this.logger.verbose('deletedIds: ', deletedIds);
        // TODO : implement necessary C/U/D operations
    }

    /**
     * Retrieves a list of search results from a
     * pre-configured API.
     * 
     */
    list = () => {
        // TODO : implement
    }

    /**
     * Fetches one single record froom a pre-configured
     * API.
     * 
     */
    fetch = () => {
        // TODO : implement
    }
}