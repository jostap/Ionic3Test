import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('bounce', [
      state('*', style({
        transform: "translateX(0)"
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(-65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ])))
    ])
  ]
})

export class HomePage {
  splash = true;
  //tabBarElement: any;

  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";
  state: string = 'x';

  constructor(public navCtrl: NavController) {
    //this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewDidLoad(){
    //this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      //this.tabBarElement.style.display = 'flex';
    }, 4000)
  }

  skip() {
    this.navCtrl.push(MainPage);
  }

  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Alright, I got it";
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = "rightSwipe";
    else
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }

}
