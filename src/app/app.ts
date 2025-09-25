import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@env/environment';
import { Sidebar } from '@shared/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal(environment.app_name);
}
