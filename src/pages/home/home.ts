import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FormBuilder, Validators } from '@angular/forms';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	info: any = 'Hallow';
	scannedSuccess: boolean;
	gotoLink: boolean;
	qrData = null;
    createdCode = null;

  	constructor(private iab: InAppBrowser, public fb: FormBuilder, public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {

  	}

  	public scannedInfo = this.fb.group({
	    info: ["", Validators.compose([Validators.required])]
	});

	createCode() {
    	this.createdCode = this.qrData;
  	}

  	scanBarcode() {
  		this.scannedSuccess = false;
  		this.barcodeScanner.scan().then((barcodeData) => {
		 	// Success! Barcode data is here
		 	// alert(barcodeData.text + ' ' + barcodeData.format);
		 	console.log(barcodeData);
		 	this.scannedSuccess = true;
		 	this.info = barcodeData.text;
		}, (err) => {
		    // An error occurred
		    alert('Error occured');
		    this.scannedSuccess = false;
		});	
  	}

  	getScannedInfo() {
  		const scanned_info = this.scannedInfo.value;
  		console.log(scanned_info);
  		const browser = this.iab.create(scanned_info.info,'_self',{location:'no'}); 
  	}

}
