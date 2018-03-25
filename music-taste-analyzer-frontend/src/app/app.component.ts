import { Component } from '@angular/core';
import {Song } from '../../model/song';
// Import the DataService
import { SongService } from './song.service';
import {DomSanitizer} from '@angular/platform-browser';
import {YoutubePlayerModule} from 'ngx-youtube-player';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  player: YT.Player;
  private id: string = 'qDuKsiwS5xw';
 
    savePlayer (player) {
    this.player = player;
    console.log('player instance', player)
    }
  onStateChange(event){
    console.log('player state', event.data);

  }
}