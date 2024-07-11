import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'todoApp';

  toggleSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('display-block')
  }

}
