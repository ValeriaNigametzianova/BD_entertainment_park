import {makeAutoObservable} from "mobx";

export default class ParkStore {
    constructor() {
        this._park = [
            {id:1, town:"Москва"},
            {id:2, town:"Сочи"},
            {id:3, town:"Москва"},
            {id:4, town:"Cочи"},
            {id:5, town:"Владивосток"},
        ]
        this._selectedPark={}
        makeAutoObservable(this)
    }

    setPark(park){
        this._park = park
    }
    setSelectedPark(park){
        this._selectedPark=park
    }
    
    get park(){
        return this._park
    }
    get setSelectedPark(){
        return this._setSelectedPark
    }
}