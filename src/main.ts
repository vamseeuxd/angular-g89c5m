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
        <li class="list-group-item shadow-sm rounded-0" [style.opacity]="copiedItem?.id == option.id ? 1 : 1">
            <div class="d-flex justify-content-center align-items-center">
              <i (click)="option.open = !option.open" role="button" [class.fa-folder-o]="!option.open" [class.fa-folder-open-o]="option.open" class="fa m-0 p-0 me-2"></i> 
              <div class="col d-flex me-3 ms-2">
                <label class="col-6 text-dark">{{option.name}}</label>
                <label class="col-6 text-success text-end fw-bold">{{option.amount | currency : 'INR'}}</label>
              </div>
              <div class="ms-auto" *ngIf="!copiedItem">
                <button role="button" title="Delete" (click)="options.splice(ind, 1)" class="btn btn-outline-danger me-1 shadow-sm btn-sm"><i class="fa fa-trash"></i></button>
                <button role="button" title="Copy" (click)="copiedItem = option; action = 'copy'" (click)="options.splice(ind, 1)" class="btn btn-outline-warning ms-1 shadow-sm btn-sm"><i class="fa fa-copy"></i></button>
              </div>
              <div class="ms-auto" *ngIf="copiedItem">
                <button role="button" title="Cancel Copy" (click)="copiedItem = null" class="btn btn-outline-danger me-1 shadow-sm btn-sm"><i class="fa fa-times"></i></button>
                <button role="button" title="Paste Below" (click)="pasteItem(options,ind+1)" class="btn btn-outline-primary me-1 shadow-sm btn-sm"><i class="fa fa-arrow-down"></i></button>
                <button role="button" title="Paste Inside" (click)="pasteItem(option.children,option.children.length - 1)" class="btn btn-outline-primary ms-1 shadow-sm btn-sm"><i class="fa fa-indent"></i></button>
              </div>
            </div>
        </li>
        <ng-container *ngIf="option.children && option.open">
          <li class="list-group-item shadow-sm rounded-0" >
            <ng-container *ngTemplateOutlet="planingList; context:{options:option.children}"></ng-container>
          </li>
        </ng-container>
      </ng-container>   
      <li class="list-group-item mt-2 border-top shadow-sm rounded-0" *ngIf="!copiedItem">
        <div class="input-group">
          <input type="text" class="form-control me-1" placeholder="Name" #nameRef (keyup.enter)="addItem( options, amountRef, nameRef )">
          <input type="number" class="form-control ms-1" placeholder="Amount" #amountRef (keyup.enter)="addItem( options, amountRef, nameRef )">
        </div>
      </li>   
    </ul>
    </ng-template>
  `,
})
export class App {
  copiedItem: any | null = null;
  action: 'cut' | 'copy' | null = null;
  data = [
    {
      id: 1,
      open: false,
      name: 'Test 123',
      amount: '500',
      children: [],
    },
    {
      id: 2,
      open: false,
      name: 'Test 456',
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
        id: new Date().getTime(),
        open: false,
        name: nameRef.value,
        amount: Number(amountRef.value),
        children: [],
      });
      amountRef.value = '';
      nameRef.value = '';
      nameRef.focus();
    } else if (!amountRef.value) {
      amountRef.focus();
    } else if (!nameRef.value) {
      nameRef.focus();
    }
  }
  pasteItem(options: any[], index: number) {
    options.splice(index, 0, { ...this.copiedItem, id: new Date().getTime() });
  }
}

bootstrapApplication(App);
