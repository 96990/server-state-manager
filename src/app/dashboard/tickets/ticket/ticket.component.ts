import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  data = input.required<Ticket>();
  detailsVisible = signal(false);
  close = output();

  onToggleDetails(){
    // this.detailsVisible.set(!this.detailsVisible()); // alternative
    this.detailsVisible.update((wasVisible) => !wasVisible); 
    // update requires a function as a parameter it passes the old signal value as parameter to the function.
  }

  onMarkAsCompleted(){
    this.close.emit();
  }
}
