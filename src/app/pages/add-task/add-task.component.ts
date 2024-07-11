import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoServiceService } from '../../services/todo-service.service';
import { TodoItem } from '../../models/todo-item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  providers: [DatePipe]
})
export class AddTaskComponent {
  taskForm: FormGroup;
  categories: string[] = ['Work', 'Home', 'Shopping', 'Personal', 'Other'];

  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private fb: FormBuilder,
    private todoService: TodoServiceService,
    private datePipe: DatePipe
  ) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      important: false
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      formValue.date = this.datePipe.transform(formValue.date, 'dd/MM/yyyy');
      formValue.important = formValue.important == true ? 'Important' : '';
      const newTodo: TodoItem = this.taskForm.value;
      this.todoService.addTodo(newTodo)
      this.dialogRef.close(newTodo);
      this.loadTask()
      this.reloadPage();
    }
  }
  
  loadTask() {
    this.todoService.getTodo();
  }

  reloadPage(){
    this.todoService.reloadPage();
  }
}
