import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoFilterService {

  private filterSource = new BehaviorSubject<string>('All');
  currentFilter = this.filterSource.asObservable();

  constructor() { }

  changeFilter(filter: string) {
    this.filterSource.next(filter);
  }

}
