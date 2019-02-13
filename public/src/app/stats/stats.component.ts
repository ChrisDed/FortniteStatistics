import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  error: boolean;
  loaded: boolean;
  overview: boolean;
  
  season: String;
  playerStats: String;
  platformName: String;
  dropdownItems: String;
  
  info: any;
  newsObj: any;
  recentMatches: any[];
  overallStats: any[];
  soloStats: any[];
  soloS5Stats: any[];
  duoStats: any[];
  duoS5Stats: any[];
  squadStats: any[];
  squadS5Stats: any[];
  constructor(private _httpService : HttpService) { }

  ngOnInit() {
    this.info = {};
    this.newsObj = {};
    this.platformName = "PC";
    this.loaded = false;
    this.error = false;
    this.overview = true;

    this.season = "season 6";
    this.playerStats = "overall";

    this.dropdownItems = "Season 6";

    this.overallStats = [];
    this.soloStats = [];
    this.soloS5Stats = [];
    this.duoStats = [];
    this.duoS5Stats = [];
    this.squadStats = [];
    this.squadS5Stats = [];
    this.recentMatches = [];
    this.stats();
    this.news();
  }

  news() {
    this._httpService.getNews()
    .subscribe((data) => {
      this.newsObj = data;
      console.log(this.newsObj);
    })
  }

  stats() {
    var self = this;
    this._httpService.getStats()
    .subscribe((data) => {
      console.log(data);
      this.info = data;
      if (this.info.platformName == "psn") {
        this.platformName = "PS4";
      }
      if (this.info.platformName == "xbox") {
        this.platformName = "Xbox";
      }
      if(this.info.error) {
        this.error = true;
      }
      setInterval(function() {
        self.loaded = true;
      }, 2000);
      this.getOverallStats();
      this.getSoloS4Stats();
      this.getSoloS5Stats();
      this.getDuoS4Stats();
      this.getDuoS5Stats();
      this.getSquadS4Stats();
      this.getSquadS5Stats();
      this.getRecentMatches();
    });
  }

  numberWithCommas = (x) => {
    if(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "N/A";
    }
  }

  getOverallStats() {
    this.overallStats.push([this.info.lifeTimeStats[8].key, this.info.lifeTimeStats[8].value]);
    this.overallStats.push(["Top 3", this.info.lifeTimeStats[1].value]);
    this.overallStats.push(["Top 5", this.info.lifeTimeStats[0].value]);
    this.overallStats.push(["Top 10", this.info.lifeTimeStats[3].value]);
    this.overallStats.push(["Top 25", this.info.lifeTimeStats[5].value]);
    this.overallStats.push(["Score", this.info.lifeTimeStats[6].value]);
    this.overallStats.push(["Matches", this.info.lifeTimeStats[7].value]);
    this.overallStats.push(["Win Rate", this.info.lifeTimeStats[9].value]);
    this.overallStats.push(["Kills", this.info.lifeTimeStats[10].value]);
    this.overallStats.push(["K/D", this.info.lifeTimeStats[11].value]);
  }

  getSoloS4Stats() {
    if (this.info.stats.p2) {
      this.soloStats.push([this.info.stats.p2.top1.label, this.info.stats.p2.top1.value, this.numberWithCommas(this.info.stats.p2.top1.rank)])
      this.soloStats.push([this.info.stats.p2.top3.label, this.info.stats.p2.top3.value, this.numberWithCommas(this.info.stats.p2.top3.rank)])
      this.soloStats.push([this.info.stats.p2.top5.label, this.info.stats.p2.top5.value, this.numberWithCommas(this.info.stats.p2.top5.rank)])
      this.soloStats.push([this.info.stats.p2.top10.label, this.info.stats.p2.top10.value, this.numberWithCommas(this.info.stats.p2.top10.rank)])
      this.soloStats.push([this.info.stats.p2.top25.label, this.info.stats.p2.top25.value, this.numberWithCommas(this.info.stats.p2.top25.rank)])
      this.soloStats.push([this.info.stats.p2.score.label, this.numberWithCommas(this.info.stats.p2.score.value), this.numberWithCommas(this.info.stats.p2.score.rank)])
      this.soloStats.push([this.info.stats.p2.scorePerMatch.label, this.info.stats.p2.scorePerMatch.value, this.numberWithCommas(this.info.stats.p2.scorePerMatch.rank)])
      this.soloStats.push([this.info.stats.p2.matches.label, this.info.stats.p2.matches.value, this.numberWithCommas(this.info.stats.p2.matches.rank)])
      this.soloStats.push(["Win Rate", this.info.stats.p2.winRatio.value + "%", this.numberWithCommas(this.info.stats.p2.winRatio.rank)])
      this.soloStats.push([this.info.stats.p2.kills.label, this.info.stats.p2.kills.value, this.numberWithCommas(this.info.stats.p2.kills.rank)])
      this.soloStats.push([this.info.stats.p2.kpg.label, this.info.stats.p2.kpg.value, this.numberWithCommas(this.info.stats.p2.kpg.rank)])
      this.soloStats.push(["K/D", this.info.stats.p2.kd.value, this.numberWithCommas(this.info.stats.p2.kd.rank)])
    }
  }
  getSoloS5Stats() {
    if (this.info.stats.curr_p2) {
      this.soloS5Stats.push([this.info.stats.curr_p2.top1.label, this.info.stats.curr_p2.top1.value, this.numberWithCommas(this.info.stats.curr_p2.top1.rank)])
      if (this.info.stats.curr_p2.top3.value == 0) {
        this.soloS5Stats.push([this.info.stats.curr_p2.top3.label, this.info.stats.curr_p2.top3.value, "N/A"])
      } else {
        this.soloS5Stats.push([this.info.stats.curr_p2.top3.label, this.info.stats.curr_p2.top3.value, this.numberWithCommas(this.info.stats.curr_p2.top3.rank)])
      }
      if (this.info.stats.curr_p2.top5.value == 0) {
        this.soloS5Stats.push([this.info.stats.curr_p2.top5.label, this.info.stats.curr_p2.top5.value, "N/A"])
      } else {
        this.soloS5Stats.push([this.info.stats.curr_p2.top5.label, this.info.stats.curr_p2.top5.value, this.numberWithCommas(this.info.stats.curr_p2.top5.rank)])
      }
      if (this.info.stats.curr_p2.top10.value == 0) {
        this.soloS5Stats.push([this.info.stats.curr_p2.top10.label, this.info.stats.curr_p2.top10.value, "N/A"])
      } else {
        this.soloS5Stats.push([this.info.stats.curr_p2.top10.label, this.info.stats.curr_p2.top10.value, this.numberWithCommas(this.info.stats.curr_p2.top10.rank)])
      }
      if (this.info.stats.curr_p2.top25.value == 0) {
        this.soloS5Stats.push([this.info.stats.curr_p2.top25.label, this.info.stats.curr_p2.top25.value, "N/A"])
      } else {
        this.soloS5Stats.push([this.info.stats.curr_p2.top25.label, this.info.stats.curr_p2.top25.value, this.numberWithCommas(this.info.stats.curr_p2.top25.rank)])
      }
      this.soloS5Stats.push([this.info.stats.curr_p2.score.label, this.numberWithCommas(this.info.stats.curr_p2.score.value), this.numberWithCommas(this.info.stats.curr_p2.score.rank)])
      this.soloS5Stats.push([this.info.stats.curr_p2.scorePerMatch.label, this.info.stats.curr_p2.scorePerMatch.value, this.numberWithCommas(this.info.stats.curr_p2.scorePerMatch.rank)])
      this.soloS5Stats.push([this.info.stats.curr_p2.matches.label, this.info.stats.curr_p2.matches.value, this.numberWithCommas(this.info.stats.curr_p2.matches.rank)])
      this.soloS5Stats.push(["Win Rate", this.info.stats.curr_p2.winRatio.value + "%", this.numberWithCommas(this.info.stats.curr_p2.winRatio.rank)])
      this.soloS5Stats.push([this.info.stats.curr_p2.kills.label, this.info.stats.curr_p2.kills.value, this.numberWithCommas(this.info.stats.curr_p2.kills.rank)])
      this.soloS5Stats.push([this.info.stats.curr_p2.kpg.label, this.info.stats.curr_p2.kpg.value, this.numberWithCommas(this.info.stats.curr_p2.kpg.rank)])
      this.soloS5Stats.push(["K/D", this.info.stats.curr_p2.kd.value, this.numberWithCommas(this.info.stats.curr_p2.kd.rank)])
    }
  }
  getDuoS4Stats() {
    if (this.info.stats.p10) {
      this.duoStats.push([this.info.stats.p10.top1.label, this.info.stats.p10.top1.value, this.numberWithCommas(this.info.stats.p10.top1.rank)])
      this.duoStats.push([this.info.stats.p10.top3.label, this.info.stats.p10.top3.value, this.numberWithCommas(this.info.stats.p10.top3.rank)])
      this.duoStats.push([this.info.stats.p10.top5.label, this.info.stats.p10.top5.value, this.numberWithCommas(this.info.stats.p10.top5.rank)])
      this.duoStats.push([this.info.stats.p10.top10.label, this.info.stats.p10.top10.value, this.numberWithCommas(this.info.stats.p10.top10.rank)])
      this.duoStats.push([this.info.stats.p10.top25.label, this.info.stats.p10.top25.value, this.numberWithCommas(this.info.stats.p10.top25.rank)])
      this.duoStats.push([this.info.stats.p10.score.label, this.numberWithCommas(this.info.stats.p10.score.value), this.numberWithCommas(this.info.stats.p10.score.rank)])
      this.duoStats.push([this.info.stats.p10.scorePerMatch.label, this.info.stats.p10.scorePerMatch.value, this.numberWithCommas(this.info.stats.p10.scorePerMatch.rank)])
      this.duoStats.push([this.info.stats.p10.matches.label, this.info.stats.p10.matches.value, this.numberWithCommas(this.info.stats.p10.matches.rank)])
      this.duoStats.push(["Win Rate", this.info.stats.p10.winRatio.value + "%", this.numberWithCommas(this.info.stats.p10.winRatio.rank)])
      this.duoStats.push([this.info.stats.p10.kills.label, this.info.stats.p10.kills.value, this.numberWithCommas(this.info.stats.p10.kills.rank)])
      this.duoStats.push([this.info.stats.p10.kpg.label, this.info.stats.p10.kpg.value, this.numberWithCommas(this.info.stats.p10.kpg.rank)])
      this.duoStats.push(["K/D", this.info.stats.p10.kd.value, this.numberWithCommas(this.info.stats.p10.kd.rank)])
    }
  }
  getDuoS5Stats() {
    if (this.info.stats.curr_p10) {
      this.duoS5Stats.push([this.info.stats.curr_p10.top1.label, this.info.stats.curr_p10.top1.value, this.numberWithCommas(this.info.stats.curr_p10.top1.rank)])
      if (this.info.stats.curr_p10.top3.value == 0) {
        this.duoS5Stats.push([this.info.stats.curr_p10.top3.label, this.info.stats.curr_p10.top3.value, "N/A"])
      } else {
        this.duoS5Stats.push([this.info.stats.curr_p10.top3.label, this.info.stats.curr_p10.top3.value, this.numberWithCommas(this.info.stats.curr_p10.top3.rank)])
      }
      if (this.info.stats.curr_p10.top5.value == 0) {
        this.duoS5Stats.push([this.info.stats.curr_p10.top5.label, this.info.stats.curr_p10.top5.value, "N/A"])
      } else {
        this.duoS5Stats.push([this.info.stats.curr_p10.top5.label, this.info.stats.curr_p10.top5.value, this.numberWithCommas(this.info.stats.curr_p10.top5.rank)])
      }
      if (this.info.stats.curr_p10.top10.value == 0) {
        this.duoS5Stats.push([this.info.stats.curr_p10.top10.label, this.info.stats.curr_p10.top10.value, "N/A"])
      } else {
        this.duoS5Stats.push([this.info.stats.curr_p10.top10.label, this.info.stats.curr_p10.top10.value, this.numberWithCommas(this.info.stats.curr_p10.top10.rank)])
      }
      if (this.info.stats.curr_p10.top25.value == 0) {
        this.duoS5Stats.push([this.info.stats.curr_p10.top25.label, this.info.stats.curr_p10.top25.value, "N/A"])
      } else {
        this.duoS5Stats.push([this.info.stats.curr_p10.top25.label, this.info.stats.curr_p10.top25.value, this.numberWithCommas(this.info.stats.curr_p10.top25.rank)])
      }
      this.duoS5Stats.push([this.info.stats.curr_p10.score.label, this.numberWithCommas(this.info.stats.curr_p10.score.value), this.numberWithCommas(this.info.stats.curr_p10.score.rank)])
      this.duoS5Stats.push([this.info.stats.curr_p10.scorePerMatch.label, this.info.stats.curr_p10.scorePerMatch.value, this.numberWithCommas(this.info.stats.curr_p10.scorePerMatch.rank)])
      this.duoS5Stats.push([this.info.stats.curr_p10.matches.label, this.info.stats.curr_p10.matches.value, this.numberWithCommas(this.info.stats.curr_p10.matches.rank)])
      this.duoS5Stats.push(["Win Rate", this.info.stats.curr_p10.winRatio.value + "%", this.numberWithCommas(this.info.stats.curr_p10.winRatio.rank)])
      this.duoS5Stats.push([this.info.stats.curr_p10.kills.label, this.info.stats.curr_p10.kills.value, this.numberWithCommas(this.info.stats.curr_p10.kills.rank)])
      this.duoS5Stats.push([this.info.stats.curr_p10.kpg.label, this.info.stats.curr_p10.kpg.value, this.numberWithCommas(this.info.stats.curr_p10.kpg.rank)])
      this.duoS5Stats.push(["K/D", this.info.stats.curr_p10.kd.value, this.numberWithCommas(this.info.stats.curr_p10.kd.rank)])
    }
  }
  getSquadS4Stats() {
    if (this.info.stats.p9) {
      this.squadStats.push([this.info.stats.p9.top1.label, this.info.stats.p9.top1.value, this.numberWithCommas(this.info.stats.p9.top1.rank)])
      this.squadStats.push([this.info.stats.p9.top3.label, this.info.stats.p9.top3.value, this.numberWithCommas(this.info.stats.p9.top3.rank)])
      this.squadStats.push([this.info.stats.p9.top5.label, this.info.stats.p9.top5.value, this.numberWithCommas(this.info.stats.p9.top5.rank)])
      this.squadStats.push([this.info.stats.p9.top10.label, this.info.stats.p9.top10.value, this.numberWithCommas(this.info.stats.p9.top10.rank)])
      this.squadStats.push([this.info.stats.p9.top25.label, this.info.stats.p9.top25.value, this.numberWithCommas(this.info.stats.p9.top25.rank)])
      this.squadStats.push([this.info.stats.p9.score.label, this.numberWithCommas(this.info.stats.p9.score.value), this.numberWithCommas(this.info.stats.p9.score.rank)])
      this.squadStats.push([this.info.stats.p9.scorePerMatch.label, this.info.stats.p9.scorePerMatch.value, this.numberWithCommas(this.info.stats.p9.scorePerMatch.rank)])
      this.squadStats.push([this.info.stats.p9.matches.label, this.info.stats.p9.matches.value, this.numberWithCommas(this.info.stats.p9.matches.rank)])
      this.squadStats.push(["Win Rate", this.info.stats.p9.winRatio.value + "%", this.numberWithCommas(this.info.stats.p9.winRatio.rank)])
      this.squadStats.push([this.info.stats.p9.kills.label, this.info.stats.p9.kills.value, this.numberWithCommas(this.info.stats.p9.kills.rank)])
      this.squadStats.push([this.info.stats.p9.kpg.label, this.info.stats.p9.kpg.value, this.numberWithCommas(this.info.stats.p9.kpg.rank)])
      this.squadStats.push(["K/D", this.info.stats.p9.kd.value, this.numberWithCommas(this.info.stats.p9.kd.rank)])
    }
  }
  getSquadS5Stats() {
    if (this.info.stats.curr_p9) {
      this.squadS5Stats.push([this.info.stats.curr_p9.top1.label, this.info.stats.curr_p9.top1.value, this.numberWithCommas(this.info.stats.curr_p9.top1.rank)])
      if (this.info.stats.curr_p9.top3.value == 0) {
        this.squadS5Stats.push([this.info.stats.curr_p9.top3.label, this.info.stats.curr_p9.top3.value, "N/A"])
      } else {
        this.squadS5Stats.push([this.info.stats.curr_p9.top3.label, this.info.stats.curr_p9.top3.value, this.numberWithCommas(this.info.stats.curr_p9.top3.rank)])
      }
      if (this.info.stats.curr_p9.top5.value == 0) {
        this.squadS5Stats.push([this.info.stats.curr_p9.top5.label, this.info.stats.curr_p9.top5.value, "N/A"])
      } else {
        this.squadS5Stats.push([this.info.stats.curr_p9.top5.label, this.info.stats.curr_p9.top5.value, this.numberWithCommas(this.info.stats.curr_p9.top5.rank)])
      }
      if (this.info.stats.curr_p9.top10.value == 0) {
        this.squadS5Stats.push([this.info.stats.curr_p9.top10.label, this.info.stats.curr_p9.top10.value, "N/A"])
      } else {
        this.squadS5Stats.push([this.info.stats.curr_p9.top10.label, this.info.stats.curr_p9.top10.value, this.numberWithCommas(this.info.stats.curr_p9.top10.rank)])
      }
      if (this.info.stats.curr_p9.top25.value == 0) {
        this.squadS5Stats.push([this.info.stats.curr_p9.top25.label, this.info.stats.curr_p9.top25.value, "N/A"])
      } else {
        this.squadS5Stats.push([this.info.stats.curr_p9.top25.label, this.info.stats.curr_p9.top25.value, this.numberWithCommas(this.info.stats.curr_p9.top25.rank)])
      }
      this.squadS5Stats.push([this.info.stats.curr_p9.score.label, this.numberWithCommas(this.info.stats.curr_p9.score.value), this.numberWithCommas(this.info.stats.curr_p9.score.rank)])
      this.squadS5Stats.push([this.info.stats.curr_p9.scorePerMatch.label, this.info.stats.curr_p9.scorePerMatch.value, this.numberWithCommas(this.info.stats.curr_p9.scorePerMatch.rank)])
      this.squadS5Stats.push([this.info.stats.curr_p9.matches.label, this.info.stats.curr_p9.matches.value, this.numberWithCommas(this.info.stats.curr_p9.matches.rank)])
      this.squadS5Stats.push(["Win Rate", this.info.stats.curr_p9.winRatio.value + "%", this.numberWithCommas(this.info.stats.curr_p9.winRatio.rank)])
      this.squadS5Stats.push([this.info.stats.curr_p9.kills.label, this.info.stats.curr_p9.kills.value, this.numberWithCommas(this.info.stats.curr_p9.kills.rank)])
      this.squadS5Stats.push([this.info.stats.curr_p9.kpg.label, this.info.stats.curr_p9.kpg.value, this.numberWithCommas(this.info.stats.curr_p9.kpg.rank)])
      this.squadS5Stats.push(["K/D", this.info.stats.curr_p9.kd.value, this.numberWithCommas(this.info.stats.curr_p9.kd.rank)])
    }
  }

  getRecentMatches() {
    if(this.info.recentMatches) {
      this.recentMatches = this.info.recentMatches;
      for(var i = 0; i < this.recentMatches.length; i++) {
        let date = new Date(this.recentMatches[i].dateCollected).toLocaleString("en-US", {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        this.recentMatches[i].dateCollected = date;
      }
    }
  }
}
