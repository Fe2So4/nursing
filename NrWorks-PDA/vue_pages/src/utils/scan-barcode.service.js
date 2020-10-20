// import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { DataService } from './operation-inspect.service'
import { ToastController } from 'ionic-angular'
import { ENV } from '@env/environment'
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc)
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
  return c > 3 && r && Object.defineProperty(target, key, r), r
}
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v)
}
var ScanBarcodeService = /** @class */ (function () {
  function ScanBarcodeService (dSvc, toastCtrl) {
    var _this = this
    this.dSvc = dSvc
    this.toastCtrl = toastCtrl
    this.subjectOfPatientWristband = new Subject()
    this.subjectOfPatientRoomNumber = new Subject()
    this.subjectOfPatientNoticeForm = new Subject()
    this.subjectOfPatientNurseWorker = new Subject()
    this.subjectOfQiXiePackage = new Subject()
    this._code = ''
    window['scanBarcodeHandler'] = function (barcode) {
      _this.receiveBarcodeCore(barcode)
    }
    console.log('ScanBarcodeService Constructor.')
  }
  ScanBarcodeService_1 = ScanBarcodeService
  ScanBarcodeService.prototype.init = function (loadingCtrl, navCtrl) {
    var _this = this
    this.loadingCtrl = loadingCtrl
    this.navCtrl = navCtrl
    if (!ScanBarcodeService_1._initialized) {
      this.globalGotoPatientPage()
      document.onkeypress = function (e) {
        _this._nextCode = e.which
        _this._nextTime = new Date().getTime()
        if (_this._lastCode != null && _this._lastTime != null && _this._nextTime - _this._lastTime <= 30) {
          _this._code += String.fromCharCode(_this._lastCode)
        } else if (_this._lastCode != null && _this._lastTime != null && _this._nextTime - _this._lastTime > 100) {
          _this._code = ''
        }
        _this._lastCode = _this._nextCode
        _this._lastTime = _this._nextTime
      }
      window.onkeypress = function (e) {
        console.log(e.which, '按键')
        if (e.which === 13) {
          // document.getElementById("scanbarcode").innerText = code;
          // $('#scanbarcode').val(code); //自动填充到表单
          // $('#but').submit(); //自动提交指定的表单
          console.log(_this._code)
          console.log('onkeypress')
          _this._code = 'OpsQRCode=17884557,OpsSchNo=341944'
          // this._code = '91161517';
          if (_this._code) {
            _this.receiveBarcodeCore(_this._code)
          }
          _this._code = ''
        } else {
          _this._code = 'P-1886829'
          if (_this._code) {
            _this.receiveBarcodeCore(_this._code)
          }
          _this._code = ''
        }
      }
    }
    ScanBarcodeService_1._initialized = true
    console.log('ScanBarcodeService:initialized')
  }
  ScanBarcodeService.prototype.receiveBarcodeCore = function (barcode) {
    console.log('receiveBarcodeCore: ', barcode)
    // 患者腕带条码
    if (parseInt(barcode)) {
      this.CureNo = barcode
      this.subjectOfPatientWristband.next(barcode)
    }
    // 房间二维码
    if (barcode.indexOf('RoomNum') != -1) {
      this.subjectOfPatientRoomNumber.next(barcode.replace('RoomNum=', ''))
    }
    // 手术通知单二维码
    if (barcode.indexOf('OpsQRCode') != -1) {
      var jsonStr
      if (barcode.indexOf('OpsSchNo') != -1) {
        var barcodelist = barcode.split(',')
        var OpsRQCode = barcodelist[0].replace('OpsQRCode=', '')
        var OpsSchNo = barcodelist[1].replace('OpsSchNo=', '')
        this.CureNo = OpsRQCode
        this.OperateNo = OpsSchNo
        jsonStr = JSON.stringify({ cureno: OpsRQCode, operateno: OpsSchNo })
      } else {
        this.CureNo = barcode.replace('OpsQRCode=', '')
        jsonStr = JSON.stringify({ cureno: barcode.replace('OpsQRCode=', '') })
      }
      this.subjectOfPatientNoticeForm.next(jsonStr)
    }
    if (barcode.indexOf('Worker') != -1) {
      this.subjectOfPatientNurseWorker.next(barcode.replace('Worker=', ''))
    }
    // 器械包条码
    if (barcode.indexOf('P-') != -1) {
      this.subjectOfQiXiePackage.next(barcode.replace('P-', ''))
    }
  }
  // 扫患者腕带
  ScanBarcodeService.prototype.subscribePatientWristbandMessage = function (fn) {
    console.log('扫患者腕带')
    var $obser = this.subjectOfPatientWristband.asObservable()
    console.log($obser, 'obser')
    return $obser.subscribe(fn)
  }
  // 扫房间号
  ScanBarcodeService.prototype.subscribePatientRoomNumberMessage = function (fn) {
    var $obser = this.subjectOfPatientRoomNumber.asObservable()
    return $obser.subscribe(fn)
  }
  // 扫手术通知单
  ScanBarcodeService.prototype.subjectOfPatientNoticeFormMessage = function (fn) {
    var $obser = this.subjectOfPatientNoticeForm.asObservable()
    return $obser.subscribe(fn)
  }
  // 扫护工
  ScanBarcodeService.prototype.subjectOfPatientNurseWorkerMessage = function (fn) {
    var $obser = this.subjectOfPatientNurseWorker.asObservable()
    return $obser.subscribe(fn)
  }
  // 扫器械包
  ScanBarcodeService.prototype.subjectOfQiXiePackageMessage = function (fn) {
    var $obser = this.subjectOfQiXiePackage.asObservable()
    return $obser.subscribe(fn)
  }
  ScanBarcodeService.prototype.globalGotoPatientPage = function () {
    var _this = this
    this.subjectOfPatientNoticeFormMessage(function () {
      var views = _this.navCtrl.getViews()
      var topView = views[views.length - 1]
      if (topView.id === 'PatientOverallPage' ||
                topView.id === 'InRoomIdentityCheckPage') {
        return
      }
      // console.log('topView.id',topView.id);
      if (topView.id === 'PortalPage') {
        var loader_1 = _this.loadingCtrl.create({
          content: '扫码处理中...'
        })
        loader_1.present()
        // this.dSvc.getPatientInfo({ cureno: this.CureNo }).subscribe(v => {
        //     //console.log(v);
        //     this.navCtrl.push("ShuttlePatientsPage", v.data.Data[0]).then(() => {
        //     });
        //     loader.dismiss();
        // });
        //  {operateno:"316463"}
        _this.dSvc.getHVSSPAByParamForScan({ operateno: _this.OperateNo }).subscribe(function (res) {
          console.log(res, 'result')
          if (res.data.Data && res.data.Data.length > 0) {
            //  this.surgicalNotice = res.data.Data[0];
            // this.checkIdentityForWard(actionType);
            //    var t={"EmployeeNo":res.data.Data[0]['schExtend'].OPERATORCODE};
            //     this.dSvc.postPhone(t).subscribe(r=>{
            //          if(r.data.Data){
            //                 var tcontent="手术名称为:"+res.data.Data[0]['schExtend'].OPNAME+",手术时间为:"+res.data.Data[0]['schExtend'].OpTime
            //                 +",手术房间为:"+res.data.Data[0]['schExtend'].RNO;
            //                 console.log("主治医生手机号为:",r.data.Data);
            //             //    var tmessage={"Phone":r.data.Data,"Txt":tcontent};
            //             var tmessage={"Phone":"17625352960","Txt":tcontent};
            //                this.dSvc.postSendmessage(tmessage).subscribe();
            //          }
            //     })
            _this.navCtrl.push('PatientOverallPage', res.data.Data[0]).then(function () { })
          }
          loader_1.dismiss()
        }, function (error) {
          console.log('error信息', error)
          var toast = _this.toastCtrl.create({
            message: ENV.timeoutMsg,
            duration: 3000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: '关闭'
          })
          toast.present()
          loader_1.dismiss()
        })
      }
    })
    // 扫患者腕带
    this.subscribePatientWristbandMessage(function () {
      var views = _this.navCtrl.getViews()
      var topView = views[views.length - 1]
      if (topView.id === 'PatientOverallPage' ||
                topView.id === 'InRoomIdentityCheckPage') {
        return
      }
      console.log('topView.id', topView.id)
      if (topView.id === 'PortalPage') {
        var loader_2 = _this.loadingCtrl.create({
          content: '扫码处理中...'
        })
        loader_2.present()
        _this.dSvc.getHVSSPAByParamForScan({ cureno: _this.CureNo }).subscribe(function (res) {
          console.log(res)
          if (res.data.Data && res.data.Data.length > 0) {
            // 有患者信息
            console.log('患者信息', res.data.Data)
            _this.navCtrl.push('PatientOverallPage', res.data.Data[0]).then(function () { })
          } else {
            // 无患者信息
            console.log('未能查询到患者信息，应该为急诊患者手术')
            _this.navCtrl.push('AddpatientPage', _this.CureNo).then(function () { })
          }
          loader_2.dismiss()
        }, function (err) {
          console.log(err)
          var toast = _this.toastCtrl.create({
            message: ENV.timeoutMsg,
            duration: 3000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: '关闭'
          })
          toast.present()
          loader_2.dismiss()
        })
      }
    })
  }
  ScanBarcodeService._initialized = false
  ScanBarcodeService = ScanBarcodeService_1 = __decorate([
    // Injectable(),
    __metadata('design:paramtypes', [DataService,
      ToastController])
  ], ScanBarcodeService)
  return ScanBarcodeService
  var ScanBarcodeService_1
}())
export { ScanBarcodeService }
// # sourceMappingURL=scan-barcode.service.js.map
