import { NgModule } from '@angular/core';
import { PlatformComponent } from './platform/platform.component'
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {path: '', component: PlatformComponent},
  {path: 'stats', component: StatsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
