import { Component, OnInit } from "@angular/core";
import { LoggerService } from "@app/shared/services/logger.service";
import { User } from "@app/state/user/user.model";
import { UserQuery } from "@app/state/user/user.query";
import { UserService } from "@app/state/user/user.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    protected users: User[] = [];

    constructor(
        private logger: LoggerService,
        private userQuery: UserQuery,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.logger.verbose('Root State: ', this.userQuery.get());
        this.userQuery.selectAll().subscribe(users => {
            this.logger.verbose('Retrieved new users list: ', users);
            this.users = users;
        });
    }

    listUsers = () => {
        this.userService.list();
    }

    formatDOB = (seconds: number | undefined): string => {
        if (!!seconds) {
            return new Date(seconds).toLocaleDateString();
        } else return 'unknown';
    }
}