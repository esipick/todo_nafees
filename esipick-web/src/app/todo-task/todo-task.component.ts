import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaskTodoService } from './todo-task.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogAnimationsExampleComponent } from '../dialog-animations-example/dialog-animations-example.component';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})

export class TodoTaskComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'priority', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private readonly service: TaskTodoService,
    public dialog: MatDialog
    ){}

  public taskList:Array<PeriodicElement> =  []

  total: number = 0;
  dataSource: any;
  currentPage: number = 0;

  ngOnInit(): void {
    this.getTaskList()
  }

  getTaskList(page=1, offset=0){
    this.service.getTasks(page,offset).subscribe((res)=>{
      console.log(res)
      this.taskList = res.data;
      this.total = res.total;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.taskList);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSaveForm  = (formData: any, existingData: any) => {
    this.dialog.closeAll();
    if(existingData){
      const updatedTask = { ...existingData, ...formData }
      this.service.updateTask(updatedTask).subscribe((res)=>{
        const index = this.taskList.findIndex((item)=>item._id === existingData._id)
        this.taskList[index] = { ...updatedTask };
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.taskList);
      })
      return;
    }

    this.service.createTask(formData).subscribe((res)=>{
      const newTaskList = [...this.taskList];
      newTaskList.push(res.data)
      this.taskList = newTaskList;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.taskList);
      this.total = res.total;
    })
  }

  onDeleteItem(element: PeriodicElement){
    this.service.deleteTask(element._id).subscribe((res)=>{
      const filteredTask = this.taskList.filter((item) => item._id != element._id )
      this.dataSource = new MatTableDataSource<PeriodicElement>(filteredTask);
      this.total = this.total - 1;
      this.dataSource.paginator = this.paginator;
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, existingData=null): void {
    this.dialog.open(DialogAnimationsExampleComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { onSaveForm: this.onSaveForm, existingData }
    });
  }

  onPageChange(event: any) {
    const pageNumber = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.getTaskList(pageNumber,pageSize);
  }
}

export interface PeriodicElement {
  _id?: string;
  title: string;
  priority: string;
  status: string;
}
