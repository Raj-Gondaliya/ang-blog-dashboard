import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {

  subscribersArray: any[] = []

  constructor(private subsService: SubscribersService) { }

  ngOnInit(): void {
    this.subsService.loadData().subscribe(val => {
      this.subscribersArray = val;
    })
  }

  onDelete(id: string) {
    this.subsService.deleteData(id);
  }
}
