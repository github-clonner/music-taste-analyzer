import { Component } from '@angular/core';
import {Song } from '../../model/song';
// Import the DataService
import { SongService } from './song.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Define a users property to hold our user data
  songs: Array<Song>;
  selectedSong: Song;
  songIndex: any;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: SongService, private sanitizer: DomSanitizer) {
    this.songIndex = 0;
    // Access the Data Service's getSongs() method we defined
    this._dataService.getSongs()
        .subscribe(res => {
          this.songs = res;
          this.selectedSong = res[this.songIndex];
        });
  }

  displayNextSong(){
    this.selectedSong= this.songs[++this.songIndex]
  }

  getEmbedUrl(videoId){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId );
  }
}