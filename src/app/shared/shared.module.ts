import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "./services/api.service";

@NgModule({
    declarations: [],
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        ReactiveFormsModule
    ]
})
export class SharedModule {}