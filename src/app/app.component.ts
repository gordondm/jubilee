import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'goga production: anniversary';
  dob: Date = new Date();
  dateControl = new FormControl(this.dob);
  today: Date;
  ageYears: number;
  ageMonths: number;
  ageWeeks: number;
  ageDays: number;
  ageHours: number;
  ageMins: number;

  ngOnInit() {
    this.dob.setFullYear(this.dob.getFullYear() - 20);
    this.dob.setMonth(9);
    this.dob.setDate(30);
    this.dob.setHours(0);
    this.dob.setMinutes(0);
    this.dob.setMilliseconds(0);
    this.calculate();
  }

  setDOB(event: MatDatepickerInputEvent<Date>) {
    this.dob = event.value;
    this.calculate();
  }

  calculate() {
    this.today = new Date();
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setMilliseconds(0);
    const milsPerMin = 60000;
    const milsPerHour = milsPerMin * 60;
    const milsPerDay = milsPerHour * 24;

    // years
    this.ageYears = this.today.getFullYear() - this.dob.getFullYear();
    if (this.today.getMonth() < this.dob.getMonth()) {
      this.ageYears--;
    } else if (this.today.getMonth() === this.dob.getMonth()) {
      if (this.today.getDate() < this.dob.getDate()) {
        this.ageYears--;
      }
    }

    // months
    this.ageMonths = this.ageYears * 12;
    const monthDifference = this.today.getMonth() - this.dob.getMonth();
    if (monthDifference > 0) {
      this.ageMonths = this.ageMonths + monthDifference;
    }

    // days
    this.ageDays = Math.floor(this.today.getTime() / milsPerDay) - Math.floor(this.dob.getTime() / milsPerDay);

    // hours
    this.ageHours = Math.floor(this.today.getTime() / milsPerHour) - Math.floor(this.dob.getTime() / milsPerHour);

    // minutes
    this.ageMins = Math.floor(this.today.getTime() / milsPerMin) - Math.floor(this.dob.getTime() / milsPerMin);
  }
}
