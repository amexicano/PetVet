import { Component } from '@angular/core';
import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { SliderComponent } from '../../modules/home/components/slider/slider.component';
import { Slider } from '../../interfaces/slider.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    SliderComponent,
    ContentCardComponent,
  ],
})

export class HomeComponent {
  slides: Slider[] = [
    { url: '/assets/image-1.jpg', title: 'beach' },
    { url: '/assets/image-2.jpg', title: 'boat' },
    { url: '/assets/image-3.jpg', title: 'forest' },
    { url: '/assets/image-4.png', title: 'city' },
    { url: '/assets/image-5.jpg', title: 'italy' },
  ];

}
