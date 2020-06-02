import { TastingRating } from './TastingRating';
import { PlaceLocation } from './PlaceLocation';

export class Coffee {
    // name : string;
    // place : string;
    _id : string;
    type : string;
    // location : PlaceLocation;
    rating : number;
    notes : string;
    tastingRating : TastingRating;

    constructor(public name: string ="", public place:string="", public location: PlaceLocation = null) {
        this.location = new PlaceLocation();
        this.tastingRating = new TastingRating();
    }
}