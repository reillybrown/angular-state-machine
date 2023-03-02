import { Component, OnInit } from "@angular/core";
import { LoggerService } from "@app/shared/services/logger.service";
import { User } from "@app/state/user/user.model";
import { UserQuery } from "@app/state/user/user.query";
import { UserService } from "@app/state/user/user.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { filter, map } from "rxjs";

interface EditUserForm {
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    protected users: User[] = [];
    protected activeUser: User = { id: 0 };
    
    constructor(
        private logger: LoggerService,
        private userQuery: UserQuery,
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {}
    
    editUserForm: FormGroup<EditUserForm> = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
    })
        
    ngOnInit(): void {
        this.logger.verbose('Root State: ', this.userQuery.get());
        this.userQuery.selectAll().subscribe(users => {
            this.logger.verbose('Retrieved new users list: ', users);
            this.users = users;
        });
        this.userQuery.selectActive().pipe(
            filter(user => user !== undefined),
            map(user => user as User)
        ).subscribe(user => {
            this.logger.verbose('Active user: ', user);
            this.logger.verbose('New active user: ', user.id);
            this.activeUser = user;
            this.editUserForm.setValue({
                firstName: user.firstName || null,
                lastName: user.lastName || null,
            }, { emitEvent: false });
        });
        this.editUserForm.valueChanges.subscribe(form => {
            this.logger.verbose('Form changes: ', form);
            const user = this.userQuery.getActive();
            if (user !== undefined && !Array.isArray(user)) {
                this.userService.update(user.id, {
                    firstName: form.firstName || undefined,
                    lastName: form.lastName || undefined
                });
            }
        });
    }

    listUsers = () => {
        this.userService.list();
    }

    selectUser = (id: number) => {
        this.userService.setActive(id);
    }
}