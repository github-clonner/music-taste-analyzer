import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { SongService } from './song.service';
import { YoutubePlayerModule } from 'ngx-youtube-player';
 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    YoutubePlayerModule
  ],
  providers: [SongService,],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
