import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-content-card',
  standalone: true,
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css'],
  imports: [
    MatCardModule,
  ],
})
export class ContentCardComponent {
  @Input() title: string | undefined;
}
