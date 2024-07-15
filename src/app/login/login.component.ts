declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  constructor() { }


  ngOnInit(): void {
    google.accounts.id.initialize({
      // client_id: '663990587528-hmu2scpu3t5m3eablhkmb62uq57r1i8c.apps.googleusercontent.com',
      client_id: '527298543497-4elhhsbvlo070bgfjsohrs3hprahm8sp.apps.googleusercontent.com',

      callback: (resp: any) => {
        this.handleLogin(resp);

        // console.log(resp)
      }
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 50
      }
    )
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));

  }
  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      this.router.navigate(['browse'])
    }

  }

}
