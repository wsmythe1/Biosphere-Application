import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
//import { StatsBarChart } from '../../assets/data/data';
import { Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
//import { Label } from 'ng2-charts';

// For Data Exportation
import { Filesystem, FilesystemDirectory } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import * as pdfMake from "pdfmake/build/pdfmake";
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';

declare var google: any;

@Component
({
  selector: 'app-visualize-results',
  templateUrl: './visualize-results.page.html',
  styleUrls: ['./visualize-results.page.scss'],
})

export class VisualizeResultsPage implements OnInit 
{
  @ViewChild('barChart') barChart;
  @ViewChild('lineChart') lineChart;
  @ViewChild('createPDFButton') createPDFButton: ElementRef;
  @ViewChild('downloadButton') downloadButton: ElementRef;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  bodyKeys = [];
  bodyData = [];

  latitudeValues = [];
  longitudeValues = [];
  timeValues
  EBV1Values = [];
  coordinateArray = [];
  heatMapData = [];
  timeSeries = [];
  rawKeys = [];

  calculatedData = [];
  calculatedDataKeys = [];

  heatMapInput = 
  [ 
    // non weighted format
    // new google.maps.LatLng(lat, long)

    // weighted format
    // {location: new google.maps.LatLng(lat, long), weight: weightValue}
  ];

  negativeHeatMapInput = [];
  
  bars: any;
  line: any;
  new64Chart: any;
  colorArray: any;
  showCreate: boolean;
  showDownload: boolean;

  height = 0;

  pdfObj = null;
  banner = null;
  base64Image = null;
  logoData = null;
  coolGradient = 
  [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)"
  ];

  map: any;

  constructor(private navCtrl: NavController, private http: HttpClient, private plt: Platform, private fileOpener: FileOpener) 
  {
    this.showCreate = false;
    this.showDownload = false;
    this.getData(http);
  }

  ngOnInit()
  {
  }

  initMap()
  {
    var heatMapLats = [];
    var heatMapLongs = [];
    var heatMapValues = [];
    
    // push the latitudes to the list
    for (let i in this.heatMapData[this.timeSeries[1]][this.rawKeys[0]])
    {
      heatMapLats.push(this.heatMapData[this.timeSeries[1]][this.rawKeys[0]][i]);
    }

    // push the longitudes to the list
    for (let i in this.heatMapData[this.timeSeries[1]][this.rawKeys[1]])
    {
      heatMapLongs.push(this.heatMapData[this.timeSeries[1]][this.rawKeys[1]][i]);
    }

    // push the EBV values to the list
    for (let i in this.heatMapData[this.timeSeries[1]][this.rawKeys[3]])
    {
      heatMapValues.push(this.heatMapData[this.timeSeries[1]][this.rawKeys[3]][i]);
    }

    // calculate the averages of latitudes and latitudes to center the map around it
    var latitudeAverage = 0, longitudeAverage = 0;

    // totaling the latitudes
    for(let i = 0; i < heatMapLats.length; i++)
    {
      latitudeAverage += heatMapLats[i];
    }

    // totaling the longitudes
    for(let i = 0; i < heatMapLongs.length; i++)
    {
      longitudeAverage += heatMapLongs[i];
    }

    // dividing each total by their length to get the average
    latitudeAverage = latitudeAverage / this.latitudeValues.length;
    longitudeAverage = longitudeAverage / this.longitudeValues.length;


    // push each piece of heatmap data to their respective lists (negative or positive)
    for(let i = 0; i < heatMapLats.length; i++)
    {
      // the negative list is values under 0 and are colored red/purple/dark blue/blue
      if( heatMapValues[i] < 0)
      {
        this.negativeHeatMapInput.push({location: new google.maps.LatLng(heatMapLats[i], heatMapLongs[i]), weight: heatMapValues[i]*-1});
      }

      // the positive list is values under 0 and are colored red/yellow/green
      if( heatMapValues[i] >= 0)
      {
        this.heatMapInput.push({location: new google.maps.LatLng(heatMapLats[i], heatMapLongs[i]), weight: heatMapValues[i]});
      }
    }

    // create the center of the map based on the average calculated data
    const location = new google.maps.LatLng(latitudeAverage, longitudeAverage);

    // configuration options for the map
    const options = 
    {
      center: location,
      zoom: 7,
      disableDefaultUI: true
    }
    
    // create the actual map object
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    // normal heat map layer (red/green)
    var heatmap = new google.maps.visualization.HeatmapLayer
    ({
      data: this.heatMapInput
    });

    // negative value heatmap layer (blue/purple)
    var negativeHeatMap = new google.maps.visualization.HeatmapLayer
    ({
      data: this.negativeHeatMapInput
    });
    

    // options for the normal heatmap
    heatmap.setOptions
    ({
      radius: 10
    });

    // options for the cool/negative heatmap
    negativeHeatMap.setOptions
    ({
      gradient: this.coolGradient,
      radius: 10
    });

    // initializing the two heatmaps
    heatmap.setMap(this.map);
    negativeHeatMap.setMap(this.map);
  }


  ///////////////DATA IMPORTATION SECTION//////////////////////////////////////////////////////////

  getData(http: HttpClient)
  {
    // grab the data from the json file and creates a JSON object
    this.http.get('../../assets/data/BigOutput-Random.json').toPromise().then(data => 
      {
        for( let key in data)
        {
          // checks if data has a key
          if (data.hasOwnProperty(key))
          {
            // check if key = latitude, if true then push current data to latitude list
            if(key == "Body")
            {
              this.bodyData.push(key);
              this.bodyData.push(data[key]);
            }

          } // end of if hasOwnProperty
        } // end of for loop

        this.bodyKeys = Object.keys(this.bodyData[1]); 
        this.rawKeys = Object.keys(this.bodyData[1][this.bodyKeys[1]]);
        this.latitudeValues = this.bodyData[1][this.bodyKeys[1]][this.rawKeys[0]];
        this.longitudeValues = this.bodyData[1][this.bodyKeys[1]][this.rawKeys[1]];
        this.timeValues = this.bodyData[1][this.bodyKeys[1]][this.rawKeys[2]];
        this.EBV1Values = this.bodyData[1][this.bodyKeys[1]][this.rawKeys[3]];
        this.heatMapData = this.bodyData[1][this.bodyKeys[3]];

        var EBVName = Object.keys(this.bodyData[1][this.bodyKeys[2]]);
        this.calculatedDataKeys = Object.keys(this.bodyData[1][this.bodyKeys[2]][EBVName[0]]);
        this.calculatedData = this.bodyData[1][this.bodyKeys[2]];


        this.timeSeries = Object.keys(this.heatMapData)

        for(let i = 0; i < this.longitudeValues.length; i++)
        {
          this.coordinateArray.push(this.latitudeValues[i] + ", " + this.longitudeValues[i]);
        }
      });
  }

///////////////VISUALIZATION SECTION//////////////////////////////////////////////////////////

envokeBarChart()
{
  var graphData = [];
  console.log(this.bodyKeys);
  for (let i in this.calculatedDataKeys)
  {
    graphData.push(this.calculatedData[this.calculatedDataKeys[i]]);
  }

  this.createBarChart(graphData, this.calculatedDataKeys);
  
  this.showCreate = true;
}

createBarChart(graphData, barChartLabels) 
{
  /////////////////BAR CHART//////////////////////////
  this.bars = new Chart(this.barChart.nativeElement, 
    {
    type: 'bar',
    data: 
    {
      labels: barChartLabels,
      datasets: 
      [
        {
        label: this.bodyData[1][this.bodyKeys[0]][3],
        data: this.EBV1Values,
        backgroundColor: 'rgb(52, 235, 103)', // array should have same number of elements as number of dataset
        borderColor: 'rgb(52, 235, 103)',// array should have same number of elements as number of dataset
        borderWidth: 1
        }/*,
        {
          label: this.BValues[0],
          data: this.BValues[1],
          backgroundColor: 'rgb(52, 195, 235)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(52, 195, 235)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }*/
      ]
    },
    options: 
    {
      scales: 
      {
        xAxes:
        [{
          scaleLabel: 
          {
            display: true,
            labelString: this.bodyData[1][this.bodyKeys[0]][0] + ", " + this.bodyData[1][this.bodyKeys[0]][1]
          }
        }],
        yAxes: 
        [{
          scaleLabel: 
          {
            display: true,
            labelString: "X Units of X Measurement"
          },
          ticks: 
          {
            beginAtZero: true
          }
        }],
      }
    }
  });

  /////////////////LINE CHART//////////////////////////
  this.line = new Chart(this.lineChart.nativeElement, 
  {
    type: 'line',
    data: 
    {
      labels: barChartLabels,
      datasets: 
      [
        {
        label: this.bodyData[1][this.bodyKeys[0]][3],
        data: this.EBV1Values,
        backgroundColor: 'rgba(0, 0, 0, 0)', // array should have same number of elements as number of dataset
        borderColor: 'rgb(52, 235, 103)',// array should have same number of elements as number of dataset
        borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}




///////////////DATA EXPORTATION SECTION//////////////////////////////////////////////////////////

  // set the image to Base64 so it can be passed through
  /*
  loadLocalAssetToBase64()
  {
    this.http.get('./assets/icon/LOGO.png', { responseType: 'blob'})
    .subscribe(res => 
    {
      const reader = new FileReader();
      reader.onloadend = () => { this.logoData = reader.result; }
      reader.readAsDataURL(res);
    });
  }
  */
  // creates a pdf object (docDefinition) with all of the items to put in the PDF
  createPDF()
  {
    const image = this.bars.toBase64Image();
    console.log(image);
    const docDefinition = 
    {
      // image logoData is 64Base string
      content: ['Bar Graph of', this.EBV1Values[0] ,/* "and ", this.BValues[0] , */{image: image, width: 500}]
    }

    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.pdfObj.open();
    this.showDownload = true;
  }

  downloadPDF()
  {
    // if device is mobile (android or iOS)
    // this code was from some dude online, doesn't really work yet
    if(this.plt.is('cordova'))
    {
      this.pdfObj.getBase64(async (data) => 
      {
        try
        {
          let path = `pdf/myletter_${Date.now()}.pdf`;

          const result = await Filesystem.writeFile
          ({
            path,
            data: data,
            directory: FilesystemDirectory.Documents,
            recursive: true
          });

          this.fileOpener.open(`${result.uri}`, 'application/pdf');
        }

        catch(e) 
        {
          console.error('Unable to write file', e)
        }

      });
    }

    // normal web client, can just invoke download()
    else
    {
      this.pdfObj.download();
    }
  }


//////////////////////////////////////////////////////////////////////////////////////////

  // Navigate back to options
  backToOptions()
  {
    this.navCtrl.navigateForward('/scenario-options');
  }
}