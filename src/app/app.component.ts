import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  isLogin = false;
  constructor(private route: Router) {
    this.route.events.subscribe(() => {
      if (
        this.route.routerState.snapshot.url == '/' ||
        localStorage.getItem('token') == null

      ) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
}
