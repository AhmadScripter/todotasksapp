import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TodoItem } from '../../models/todo-item';
import { TodoServiceService } from '../../services/todo-service.service';
import { TodoFilterService } from '../../services/todo-filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  activeFilter: string = 'All';

  @Input() toggleFunction!: () => void;

  callToggleFunction() {
    if (this.toggleFunction) {
      this.toggleFunction();
    }
  }

  constructor(private dialog: MatDialog, private todoFilterService: TodoFilterService, private todoService: TodoServiceService){ }

  setFilter(filter: string): void {
    this.todoFilterService.changeFilter(filter);
    this.activeFilter = filter;
    this.reloadPage();
  }
  reloadPage(){
    this.todoService.reloadPage();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
    });
  }

}
