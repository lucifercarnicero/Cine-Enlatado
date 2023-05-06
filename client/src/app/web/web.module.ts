import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CicloPageComponent } from './pages/ciclo-page/ciclo-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from '../material/material.module';
import { NewCicloPageComponent } from './pages/new-ciclo-page/new-ciclo-page.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
    declarations: [
        LayoutPageComponent,
        CicloPageComponent,
        ListPageComponent,
        SearchPageComponent,
        HomePageComponent,
        NewCicloPageComponent
    ],
    imports: [
        CommonModule,
        WebRoutingModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule

    ],
    exports: [

    ]
})
export class WebModule { }
