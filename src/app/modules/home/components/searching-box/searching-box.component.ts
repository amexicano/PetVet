import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-searching-box',
  standalone: true,
  templateUrl: './searching-box.component.html',
  styleUrls: ['./searching-box.component.css'],
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SearchingBoxComponent {
  @Input() placeholder !: string;
  @Input() buttonLabel !: string;
  @Output() clicked = new EventEmitter<void>();
  @Output() currentValue = new EventEmitter<string>();

  sendValue(value: string) {
    this.currentValue.emit(value);
  }

  clickButton() {
    this.clicked.emit();
  }

}
