import {makeAutoObservable} from "mobx";

export default class ParkStore {
    constructor() {
        this._park = []
        this._attarction=[ ]
        this._greenZone = []
        this._tarif=[]
        this._selectedPark={}
        makeAutoObservable(this)
    }

    setPark(park){
        this._park = park
    }
    setGreenZone(attarction){
        this._attarction = attarction
    }
    setAttraction(greenZone){
        this._greenZone = greenZone
    }
    setTarif(tarif){
        this._tarif = tarif
    }
    setSelectedPark(park){
        this._selectedPark=park
    }
    
    get park(){
        return this._park
    }
    get attarction(){
        return this._attarction
    }
    get greenZone(){
        return this._greenZone
    }
    get tarif(){
        return this._tarif
    }
    get SelectedPark(){
        return this._SelectedPark
    }
}