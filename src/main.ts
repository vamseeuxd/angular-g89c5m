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
              <div class="d-flex w-100 me-3">
                <label class="col-6 text-danger">{{option.name}}</label>
                <label class="col-6 text-success text-end fw-bold">{{option.amount | currency : 'INR'}}</label>
              </div>
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
        <div class="input-group">
          <input type="text" class="form-control me-1" placeholder="Name" #nameRef (keyup.enter)="addItem( options, amountRef, nameRef )">
          <input type="number" class="form-control ms-1" placeholder="Amount" #amountRef (keyup.enter)="addItem( options, amountRef, nameRef )">
        </div>
      </li>   
    </ul>
    <pre>{{data|json}}</pre>
  </ng-template>
  `,
})
export class App {
  data = [
    {
      open: false,
      name: 'asdfasdfas',
      amount: '500',
      children: [],
    },
    {
      open: false,
      name: 'asdfasdfasdf',
      amount: '1000',
      children: [],
    },
  ];
  addItem(
    options: any[],
    amountRef: HTMLInputElement,
    nameRef: HTMLInputElement
  ) {
    if (amountRef.value && nameRef.value) {
      options.push({
        open: false,
        name: nameRef.value,
        amount: Number(amountRef.value),
        children: [],
      });
      amountRef.value = '';
      nameRef.value = '';
    } else {
      alert('Provide Valid Name and Amount');
    }
    nameRef.focus();
  }
}

bootstrapApplication(App);
