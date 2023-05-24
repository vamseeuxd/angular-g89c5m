import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container-fluid py-3">
    <ng-container *ngTemplateOutlet="planingList; context:{options:data}"></ng-container>
  </div> 

  <ng-template #planingList let-options="options">
    <ul class="list-group shadow-sm">
      <ng-container *ngFor="let option of options; let ind=index">
        <li class="list-group-item shadow-sm rounded-0">
            <div class="d-flex justify-content-center align-items-center">
              <i (click)="option.open = !option.open" role="button" [class.fa-folder-o]="!option.open" [class.fa-folder-open-o]="option.open" class="fa m-0 p-0 me-2"></i> 
              <label>{{option.title}}</label>
              <button role="button" (click)="options.splice(ind, 1)" class="btn btn-outline-danger shadow-sm btn-sm ms-auto">
              <i class="fa fa-trash"></i>
              </button>

            </div>
        </li>
        <ng-container *ngIf="option.children && option.open">
          <li class="list-group-item shadow-sm rounded-0" >
            <ng-container *ngTemplateOutlet="planingList; context:{options:option.children}"></ng-container>
          </li>
        </ng-container>
      </ng-container>   
      <li class="list-group-item mt-2 border-top shadow-sm rounded-0">
        <input class="form-control" placeholder="New Item" #newItem (keyup.enter)="options.push({ open: false, title: newItem.value, children: [], });newItem.value = '';">
      </li>   
    </ul>
  </ng-template>


  `,
})
export class App {
  data = [];
}

bootstrapApplication(App);
