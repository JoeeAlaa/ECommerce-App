import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',loadComponent:()=>import('./components/login/login.component').then((c)=>c.LoginComponent)},
        {path:'register',loadComponent:()=>import('./components/register/register.component').then((c)=>c.RegisterComponent)},
        {path:'fotgotPassword',loadComponent:()=>import('./components/forgotpassword/forgotpassword.component').then((c)=>c.ForgotpasswordComponent)},
    ]},

    {path:'',component:MainLayoutComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'products',loadComponent:()=>import('./components/products/products.component').then((c)=>c.ProductsComponent)},
        {path:'productDetails/:id',loadComponent:()=>import('./components/product-details/product-details.component').then((c)=>c.ProductDetailsComponent)},
        {path:'categories',loadComponent:()=>import('./components/categories/categories.component').then((c)=>c.CategoriesComponent)},
        {path:'categoryDetails/:id',loadComponent:()=>import('./components/category-details/category-details.component').then((c)=>c.CategoryDetailsComponent)},
        {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((c)=>c.BrandsComponent)},
        {path:'brandDetails/:id',loadComponent:()=>import('./components/brand-details/brand-details.component').then((c)=>c.BrandDetailsComponent)},
        {path:'cart',loadComponent:()=>import('./components/cart/cart.component').then((c)=>c.CartComponent)},
        {path:'wishlist',loadComponent:()=>import('./components/wishlist/wishlist.component').then((c)=>c.WishlistComponent)},
        {path:'userDetails',loadComponent:()=>import('./components/user-details/user-details.component').then((c)=>c.UserDetailsComponent)},
        {path:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((c)=>c.AllordersComponent)},
        {path:'orders/:id',loadComponent:()=>import('./components/orders/orders.component').then((c)=>c.OrdersComponent)},
        {path:'changePassword',loadComponent:()=>import('./components/changepassword/changepassword.component').then((c)=>c.ChangepasswordComponent)},
        {path:'**',loadComponent:()=>import('./components//notfound/notfound.component').then((c)=>c.NotfoundComponent)},
    ]},

];
