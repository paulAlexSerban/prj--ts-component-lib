import { randCompanyName, randLatitude, randLongitude, randQuote } from "@ngneat/falso";
import { Mappable } from "./CustomMap";

// using Mappeable interface to ensure that Company class has the same properties as User class and can be used in CustomMap class
export class Company implements Mappable {
    companyName: string;
    catchPhrase: string;
    location: {
        lat: number;
        lng: number;
    };

    constructor() {
        this.companyName = randCompanyName();
        this.catchPhrase = randQuote();
        this.location = {
            lat: randLatitude(),
            lng: randLongitude(),
        };
    }

    markerContent(): string {
        return `
            <div>
                <h1>Company Name: ${this.companyName}</h1>
                <h3>Catchphrase: ${this.catchPhrase}</h3>
            </div>
        `;
    }
}
