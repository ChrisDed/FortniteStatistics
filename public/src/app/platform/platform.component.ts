import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {
  platform: String;
  dropdownItems: String;
  playerName: String;
  constructor(private _httpService: HttpService,
  private _router: Router) { }

  ngOnInit() {
    this.platform = "pc";
    this.dropdownItems = "PC";
    this.playerName = "";
  }

  goStats() {
    this._router.navigate(['/stats']);
  }

  onSubmit() {
    let obs = this._httpService.searchStats({platform: this.platform, player: this.playerName})
    obs.subscribe((data) => {
    });
    this.playerName = "";
    this.goStats();
  }

}
