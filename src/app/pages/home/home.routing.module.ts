import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstants } from "@app/shared/constants/routes";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    {
        path: RouteConstants.home,
        component: HomeComponent,
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {}