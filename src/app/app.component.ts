import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Account } from './interfaces/account.interface';
import { AccountService } from './services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        RouterOutlet,
        ContentCardComponent,
    ]
})

export class AppComponent {
    user?: Account | null;

    constructor(private router: Router,
        private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
        if(this.user) this.router.navigate(['/home']);
    }

    logout() {
        this.accountService.logout();
    }
}
