import {makeAutoObservable} from "mobx";

export default class ParkStore {
    constructor() {
        this._town = [
            {id:1, town:"Москва"},
            {id:2, town:"Сочи"}
        ]
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
}