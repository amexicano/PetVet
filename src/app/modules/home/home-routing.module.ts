import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: ' PetVet - Home' },
  { path: 'citas', loadChildren: () => import('./modules/citas/citas.module').then(m => m.CitasModule)},
  { path: 'empleados', loadChildren: () => import('./modules/empleados/empleados.module').then(m => m.EmpleadosModule) },
  { path: 'clientes', loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
