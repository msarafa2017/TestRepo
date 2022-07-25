import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ItemTypeComponent } from './item-type/item-type.component';
import { routing } from './app.rout';
import { ItemComponent } from './item/item.component';
import { CreateItemTypeComponent } from './item-type/create-item-type/create-item-type.component';
import { UpdateItemTypeComponent } from './item-type/update-item-type/update-item-type.component';
import { ItemTypeDetailsComponent } from './item-type/item-type-details/item-type-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemNotExsitComponent } from './item-not-exsit/item-not-exsit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonService } from './services/common.service';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { UpdateItemComponent } from './item/update-item/update-item.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { CustomerComponent } from './customer/customer.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginLayoutComponent } from './shared/login-layout/login-layout.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './shared/client-layout/client-layout.component';
import { BillComponent } from './bill/bill.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './bill/create/create.component';
import { UpdateComponent } from './bill/update/update.component';
import { AddItemsComponent } from './bill/add-items/add-items.component';
import { SaveBillComponent } from './bill/save-bill/save-bill.component';
import { BillDetailsComponent } from './bill/bill-details/bill-details.component';
import { BillWizardComponent } from './bill/bill-wizard/bill-wizard.component';
import { BillService } from './services/bill.service';
import { HomeComponent } from './home/home.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import { BillItemsDialogComponent } from './bill/bill-items-dialog/bill-items-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TitleArabicNamePipe } from './Common/title-arabic-name.pipe';
import { SearchOutputIndexComponent } from './item-type/SearchOutput/search-output-index/search-output-index.component';
import { SearchOutputSearchComponent } from './item-type/SearchOutput/search-output-search/search-output-search.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { SingleSlotComponent } from './ContentProjection/single-slot/single-slot.component';
import { MultiSlotComponent } from './ContentProjection/multi-slot/multi-slot.component';
import { ConditionalComponent } from './ContentProjection/conditional/conditional.component';
import { ProjectionHomeComponent } from './ContentProjection/projection-home/projection-home.component';
import { RegisterComponent } from './login/register/register.component';
import { ConfirmEqualDirective } from './Common/confirm-equal.directive';
import { Test1Component } from './go-js/test1/test1.component';
import { PreviewShapsComponent } from './go-js/preview-shaps/preview-shaps.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, ItemTypeComponent, ItemComponent, CreateItemTypeComponent, UpdateItemTypeComponent, ItemTypeDetailsComponent, ItemNotExsitComponent, CreateItemComponent, UpdateItemComponent, ItemDetailsComponent, CustomerComponent, CreateCustomerComponent, CustomerDetailsComponent, UpdateCustomerComponent, LoginLayoutComponent, AdminLayoutComponent, ClientLayoutComponent, BillComponent, LoginComponent, CreateComponent, UpdateComponent, AddItemsComponent, SaveBillComponent, BillDetailsComponent, BillWizardComponent, HomeComponent, BillItemsDialogComponent, TitleArabicNamePipe, SearchOutputIndexComponent, SearchOutputSearchComponent, PageNotFoundComponent, SingleSlotComponent, MultiSlotComponent, ConditionalComponent, ProjectionHomeComponent, RegisterComponent, ConfirmEqualDirective, Test1Component, PreviewShapsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 5000,
      positionClass: 'toast-bottom-left', closeButton: true, progressBar: true, progressAnimation: 'decreasing', newestOnTop: true,
      preventDuplicates: true, iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
    }}),
    MatDatepickerModule, MatInputModule, MatNativeDateModule
  ],
  providers: [CommonService, BillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
