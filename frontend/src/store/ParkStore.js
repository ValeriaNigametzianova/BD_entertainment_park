import { makeAutoObservable } from 'mobx'

export default class ParkStore {
  constructor() {
    this._parks = []
    this._towns = []
    this._selectedTown = ''
    this._attarctions = []
    this._greenZones = []
    this._tarifs = []
    this._selectedPark = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 2
    makeAutoObservable(this)
  }

  setPark(parks) {
    this._parks = parks
  }
  setTown(towns) {
    this._towns = towns
  }
  setSelectedTown(selectedTown) {
    console.log('setSelected', selectedTown)
    this._selectedTown = selectedTown
  }
  setAttraction(attarctions) {
    this._attarctions = attarctions
  }
  setGreenZones(greenZones) {
    this._greenZones = greenZones
  }
  setTarif(tarifs) {
    this._tarifs = tarifs
  }
  setSelectedPark(park) {
    this._selectedPark = park
  }
  setPage(page) {
    this._page = page
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount
  }

  get parks() {
    return this._parks
  }
  get selectedPark() {
    return this._selectedPark
  }
  get towns() {
    return this._towns
  }
  get selectedTown() {
    return this._selectedTown
  }
  get attarctions() {
    return this._attarctions
  }
  get greenZones() {
    return this._greenZones
  }
  get tarifs() {
    return this._tarifs
  }
  get page() {
    return this._page
  }
  get totalCount() {
    return this._totalCount
  }
  get limit() {
    return this._limit
  }
}
