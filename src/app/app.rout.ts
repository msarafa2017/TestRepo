import { RouterModule, Routes } from "@angular/router";
import { ItemTypeComponent } from "./item-type/item-type.component";
import { CreateItemTypeComponent } from "./item-type/create-item-type/create-item-type.component";
import { ItemComponent } from "./item/item.component";
import { ItemTypeDetailsComponent } from "./item-type/item-type-details/item-type-details.component";
import { UpdateItemTypeComponent } from "./item-type/update-item-type/update-item-type.component";
import { CreateItemComponent } from "./item/create-item/create-item.component";
import { UpdateItemComponent } from "./item/update-item/update-item.component";
import { ItemDetailsComponent } from "./item/item-details/item-details.component";
import { CreateCustomerComponent } from "./customer/create-customer/create-customer.component";
import { UpdateCustomerComponent } from "./customer/update-customer/update-customer.component";
import { CustomerDetailsComponent } from "./customer/customer-details/customer-details.component";
import { CustomerComponent } from "./customer/customer.component";
import { LoginLayoutComponent } from "./shared/login-layout/login-layout.component";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout.component";
import { ClientLayoutComponent } from "./shared/client-layout/client-layout.component";
import { BillComponent } from "./bill/bill.component";
import { LoginComponent } from "./login/login.component";
import { AddItemsComponent } from "./bill/add-items/add-items.component";
import { CreateComponent } from "./bill/create/create.component";
import { UpdateComponent } from "./bill/update/update.component";
import { SaveBillComponent } from "./bill/save-bill/save-bill.component";
import { BillDetailsComponent } from "./bill/bill-details/bill-details.component";
import { HomeComponent } from "./home/home.component";
import { SearchOutputIndexComponent } from "./item-type/SearchOutput/search-output-index/search-output-index.component";
import { PageNotFoundComponent } from "./home/page-not-found/page-not-found.component";
import { ProjectionHomeComponent } from "./ContentProjection/projection-home/projection-home.component";
import { RegisterComponent } from "./login/register/register.component";
import { PreviewShapsComponent } from "./go-js/preview-shaps/preview-shaps.component";


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'LoginLayout', component: LoginLayoutComponent, children: [
      { path: 'Login', component: LoginComponent, pathMatch: 'full' },
      { path: 'Register', component: RegisterComponent, pathMatch: 'full' }

    ]
  },
  {
    path: 'AdminLayout', component: AdminLayoutComponent, children: [
      { path: 'ItemType', component: ItemTypeComponent, pathMatch: 'full' },
      { path: 'ItemTypeDetails/:id', component: ItemTypeDetailsComponent, pathMatch: 'full' },
      { path: 'UpdateItemType/:id', component: UpdateItemTypeComponent, pathMatch: 'full' },
      { path: 'CreateItemType', component: CreateItemTypeComponent, pathMatch: 'full' },
      { path: 'ItemTypeIndex', component: SearchOutputIndexComponent, pathMatch: 'full' },

      { path: 'Item', component: ItemComponent, pathMatch: 'full' },
      { path: 'ItemDetails/:id', component: ItemDetailsComponent, pathMatch: 'full' },
      { path: 'UpdateItem/:id', component: UpdateItemComponent, pathMatch: 'full' },
      { path: 'CreateItem', component: CreateItemComponent, pathMatch: 'full' },

      { path: 'Customer', component: CustomerComponent, pathMatch: 'full' },
      { path: 'CustomerDetails/:id', component: CustomerDetailsComponent, pathMatch: 'full' },
      { path: 'UpdateCustomer/:id', component: UpdateCustomerComponent, pathMatch: 'full' },
      { path: 'CreateCustomer', component: CreateCustomerComponent, pathMatch: 'full' },

      { path: 'ProjectionHome', component: ProjectionHomeComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'ClientLayout', component: ClientLayoutComponent, children: [
      { path: 'Bill', component: BillComponent, pathMatch: 'full' },
      { path: 'Create', component: CreateComponent, pathMatch: 'full' },
      { path: 'Update/:id', component: UpdateComponent, pathMatch: 'full' },
      { path: 'AddItems/:id', component: AddItemsComponent, pathMatch: 'full' },
      { path: 'SaveBill/:id', component: SaveBillComponent, pathMatch: 'full' },
      { path: 'BillDetails/:id', component: BillDetailsComponent, pathMatch: 'full' },

    ]
  },
  { path: 'PreviewShaps', component: PreviewShapsComponent, pathMatch: 'full' },

  // {path:'TestDetails/:id',component:TestDetailsComponent, pathMatch:'full'},
  // {path:'TestUpdate',component:TestUpdateComponent},
  //{path:'itemtypeDtails/:id',component:DetailsComponent}, {path:'itemtype',component:IndexComponent}

  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
]

export const routing = RouterModule.forRoot(routes);
