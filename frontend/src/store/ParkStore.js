import { makeAutoObservable } from 'mobx'
export default class ParkStore {
  constructor() {
    this._parks = []
    this._towns = []
    this._selectedTown = ''
    this._searchQuery = ''
    this._attarctions = []
    this._greenZones = []
    this._tarifs = []
    this._selectedPark = []
    this._tempQuery = ''
    this._searchPark = []
    this._page = 1
    this._totalCount = 0
    this._limit = 3
    this._alertStatus = null
    this._alertMessage = null
    this._visible = false
    makeAutoObservable(this)
  }

  setPark(parks) {
    this._parks = parks
  }
  setTown(towns) {
    this._towns = towns
  }
  setSelectedTown(selectedTown) {
    this._selectedTown = selectedTown
  }
  setSearchQuery(searchQuery) {
    this._searchQuery = searchQuery
  }
  setTempQuery(tempQuery) {
    this._tempQuery = tempQuery
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
  setSearchPark(searchPark) {
    this._searchPark = searchPark
  }
  setPage(page) {
    this._page = page
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount
  }
  setAlertStatus(alertStatus) {
    this._alertStatus = alertStatus
  }
  setAlertMessage(alertMessage) {
    this._alertMessage = alertMessage
  }
  setVisible(visible) {
    this._visible = visible
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
  get searchQuery() {
    return this._searchQuery
  }
  get tempQuery() {
    return this._tempQuery
  }
  get searchPark() {
    return this._searchPark
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
  get alertStatus() {
    return this._alertStatus
  }
  get alertMessage() {
    return this._alertMessage
  }
  get visible() {
    return this._visible
  }
}
