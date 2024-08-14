import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'it';

  ngOnInit(): void {
  }
  // constructor(private router: Router) {}
  //
  // ngOnInit() {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       document.body.className = this.router.url === '/home' ? 'home-page' : '';
  //     }
  //   });
  // }

}
