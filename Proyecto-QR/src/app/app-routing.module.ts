import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./Access/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Access/perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [AuthGuard] // Aplica el AuthGuard para proteger la ruta
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  { 
    path: 'user-management', 
    component: UserManagementComponent 
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule),
    canActivate: [AuthGuard] // Aplica el AuthGuard para proteger la ruta
  },
  {
    path: 'paginaqr',
    loadChildren: () => import('./Access/paginaqr/paginaqr.module').then( m => m.PaginaqrPageModule),
    canActivate: [AuthGuard] // Aplica el AuthGuard para proteger la ruta
  },
  {
    path: 'gestion-clases',
    loadChildren: () => import('./Access/gestion-clases/gestion-clases.module').then( m => m.GestionClasesPageModule),
    canActivate: [AuthGuard] // Aplica el AuthGuard para proteger la ruta
  },
  {
    path: 'seleccionar-clase',
    loadChildren: () => import('./Access/seleccionar-clase/seleccionar-clase.module').then( m => m.SeleccionarClasePageModule),
    canActivate: [AuthGuard] // Aplica el AuthGuard para proteger la ruta
  },
  {
    path: 'scanner',
    loadChildren: () => import('./Access/scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: '**',
    redirectTo: 'page-not-found'  // Redirige a la página 404
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
