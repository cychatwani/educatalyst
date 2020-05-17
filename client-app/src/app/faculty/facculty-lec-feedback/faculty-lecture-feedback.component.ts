import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../Services/Course-service';
import {FormBuilder} from '@angular/forms';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

import {FeedBackService} from '../../../Services/FeedBack-service';
import {DecimalPipe} from '@angular/common';
// @ts-ignore

@Component({
  selector: 'app-facculty-lec-feedback',
  templateUrl: './faculty-lecture-feedback.component.html',
  styleUrls: ['./faculty-lecture-feedback.component.css'
  ]
})
export class FacultyLectureFeedbackComponent implements OnInit {
  private lineChartData: ChartDataSets[] = [];
  private lineChartLabels: Label[] = [];
  private lineChartOptions: (ChartOptions & { annotation: any }) = {
    title: {
      fontColor: 'rgb(127,255,0)',
      text: 'Average Rating Lecture wise',
      display: true
    },
    plugins: {
      datalabels: {
        backgroundColor: 'rgb(127,255,0)',
        color: 'black',
        align: 'right',
        formatter: (value, context) => {
          return this._decimalPipe.transform(value, '1.2-2');
        },
        font: {
          weight: 'bolder',
          size: 14,
        }
      }
    },
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        ticks: {
          fontColor: 'rgba(127,255,0,1)',
        }
      }],
      yAxes: [
        {
          id: 'y-axis-1',
          position: 'left',
          gridLines: {
            color: 'rgba(127,255,0,0.2)',
          },
          ticks: {
            beginAtZero: true,
            stepSize: 0.1,
            max: 5.0,
            fontColor: 'rgba(127,255,0,1)',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          borderWidth: 2,
        },
      ],
    },
  };
  private lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(127,255,0,0.1)',
      borderColor: 'rgb(127,255,0)',
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: 'rgb(255,255,255)',
      pointHoverBackgroundColor: 'rgb(127,255,255)',
      pointHoverBorderColor: 'rgb(127,255,255)'
    }
  ];
  private lineChartLegend = true;
  private lineChartType = 'line';
  private lineChartPlugins = [pluginDataLabels];
  private Average: number;
  private Total: number = 0;
  private NumberOfRatings = 0;
  private sub: any;
  private isDataAvailable = false;
  // tslint:disable-next-line:align
  private cDatas = new Map<number, ChartDataSets[]>();
  private colorNum: number;
  private key: string;
  private  lectureList: Array<any>;
  private chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(240,240,255,1)',
    }];
  private barChartPlugins = [pluginDataLabels];
  // @ts-ignore
  // @ts-ignore
  private barChartOptions: ChartOptions = {
    legend : {
      labels : {
        fontColor : '#ffffff'
      }
    },
    title: {
      fontColor: '#fffff',
      text: 'Lecture Ratings',
      display: true
    },
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
        ticks: {
          fontColor: 'white'
        },
        barPercentage: 0.3
      }], yAxes: [{
        ticks: {
          fontColor: 'white',
          beginAtZero: true,
          stepSize: 1
        }
      }] },
    plugins: {
      datalabels: {
        color: 'white',
        anchor: 'end',
        align: 'end',
      }
    }
  };

  private barChartLabels: Label[] = ['Rating : 1', 'Rating : 2', 'Rating : 3', 'Rating : 4', 'Rating : 5'];
  private barChartType: ChartType = 'bar';
  private barChartLegend = true;
  private barChartData: ChartDataSets[] = [];

  // tslint:disable-next-line:max-line-length variable-name
  constructor(private _decimalPipe: DecimalPipe, private route: ActivatedRoute, private router: Router, private feedBackService: FeedBackService, private formBuilder: FormBuilder) {
  }
  toggleData(id: number) {
    for (const lecture of this.lectureList) {
      if (lecture.id === id) {
        lecture.viewFeedBack = !lecture.viewFeedBack;
        lecture.viewComments = false;
      }
    }
  }
  toggleComments(id: number) {
    for (const lecture of this.lectureList) {
      if (lecture.id === id) {
        lecture.viewComments = !lecture.viewComments;
        lecture.viewFeedBack = false;
      }
    }
  }

  async ngOnInit() {
    this.sub = await this.route.params.subscribe(params => {
      this.colorNum = +(params.color);
      this.key = params.key;
    });
    console.log('hello');
    const res = await this.feedBackService.getLectures(this.key);
    this.lectureList = res.unRatedLectures;
    const avgRatings = new Array<number>();
    for (const lecture of this.lectureList) {
      lecture.viewFeedBack = false;
      lecture.viewComments = false;
      const feedbacks = await this.feedBackService.getFeedBacks(lecture.id);
      lecture.feedbacks = feedbacks;
      console.log(feedbacks);
      if (feedbacks.length !== 0) {
        this.lineChartLabels.push(lecture.lectureTitle);
        let avg = 0;
        lecture.hasfeedBack = true;
        const arr = new Array();
        for (let i = 0; i < 5; i++) {
          arr.push(0);
        }
        for (const feedback of feedbacks) {
          const R = +feedback.ratings;
          avg += R;
          arr[R - 1]++;
          this.Total += R;
          this.NumberOfRatings++;
        }
        avg /= feedbacks.length;
        avgRatings.push(avg);
        lecture.averageRatings = avg;
        lecture.totalRatings = feedbacks.length;
        console.log(arr);
        const obj = {
          data: arr,
          label: lecture.lectureTitle
        };
        const newData: ChartDataSets[] = [];
        newData.push(obj);
        this.cDatas.set(lecture.id, newData);
        console.log(obj);
        const overallChartData = { data: avgRatings, label: 'Series A' };
        // @ts-ignore
        // console.log(l)
      } else { lecture.hasfeedBack = false; }
      this.Average = this.Total / this.NumberOfRatings;
    }
    // this.Average = avgRatings.reduce((a, b) => a + b, 0)/avgRatings.length;
    this.lineChartData.push({data: avgRatings, label: 'Average Ratings'});
    this.isDataAvailable = true;
    console.log(this.lectureList);
  }

}
