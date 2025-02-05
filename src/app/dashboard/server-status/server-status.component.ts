import { Component, DestroyRef, effect, inject, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent {
	currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  // private interval?: NodeJS.Timeout; //ReturnType<typeof setInterval>
  private destroyRef = inject(DestroyRef);
  constructor(){
    effect(() => {
      console.log(this.currentStatus())
    });
  }

  ngOnInit(){
    const interval = setInterval(() => {
      const rnd = Math.random(); //0-0.999999999
      if(rnd < 0.5){
        this.currentStatus.set('online');
      }else if (rnd < 0.9){
        this.currentStatus.set('offline');
      }
      else{
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() =>{ //on destroy ref is in angular 16 and higher.
      clearInterval(interval)
    });
  }

  // ngOnDestroy(){
  //   clearInterval(this.interval);
  // }
}
