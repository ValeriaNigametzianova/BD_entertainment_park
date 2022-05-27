import {makeAutoObservable} from "mobx";

export default class ParkStore {
    constructor() {
        this._park = [
            {id:1, name:"Солнечные зайчики", town:"Москва", description: "Самый счастливый парк"},
            {id:2, name:"Шляпа твоей мамы", town:"Сочи", description: "Самый счастливый парк"},
            {id:3, name:"Самоцвет якутского брадобрея", town:"Москва", description: "Самый счастливый парк"},
            {id:4, name:"Привет, Антоша", town:"Cочи", description: "Самый счастливый парк"},
            {id:5, name:"АХАХАХХАХАХАХ", town:"Владивосток", description: "Самый счастливый парк"},
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
    get SelectedPark(){
        return this._SelectedPark
    }
}