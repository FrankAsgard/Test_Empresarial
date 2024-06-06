import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputScreenComponent } from './input-screen/input-screen.component';
import { SummaryScreenComponent } from './summary-screen/summary-screen.component';

export const routes: Routes = [
  { path: '', component: InputScreenComponent },
  { path: 'summary', component: SummaryScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
