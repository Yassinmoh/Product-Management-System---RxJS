import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';


<li * ngFor="let item of items ; trackBy:trackById" >
  {{ item.name }}
</li>

trackById(index: number, item: any): any {
  return item.id
}

}




