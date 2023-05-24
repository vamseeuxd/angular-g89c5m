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
      <ng-container *ngFor="let option of options">
        <li class="list-group-item  shadow-sm rounded-0" (click)="option.open = !option.open" role="button">
         <i  *ngIf="option.children && option.children.length > 0" [class.fa-folder-o]="!option.open" [class.fa-folder-open-o]="option.open" class="fa fa-folder-open-o"></i> {{option.title}}
        </li>
        <ng-container *ngIf="option.children && option.children.length > 0 && option.open">
          <li class="list-group-item shadow-sm rounded-0" >
            <ng-container *ngTemplateOutlet="planingList; context:{options:option.children}"></ng-container>
          </li>
        </ng-container>
        <li class="list-group-item mt-2 border-top shadow-sm rounded-0">
          <input class="form-control" placeholder="New Item" #newItem (keyup.enter)="addNewItem(newItem, option)">
        </li>
      </ng-container>      
    </ul>
  </ng-template>


  `,
})
export class App {
  data = [
    {
      open: false,
      title: 'Test - 01',
      children: [
        {
          open: false,
          title: 'Test - 01 - 01',
          children: [],
        },
      ],
    },
  ];
  addNewItem(newItem: HTMLInputElement, option: any) {
    option.children.push({ title: newItem.value, children: [] });
    newItem.value = '';
  }
}

bootstrapApplication(App);
