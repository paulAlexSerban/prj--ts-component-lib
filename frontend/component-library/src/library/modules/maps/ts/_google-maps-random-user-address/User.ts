import { randFirstName, randLastName, randLatitude, randLongitude } from "@ngneat/falso";
import { Mappable } from "./CustomMap";

// using Mappeable interface to ensure that User class has the same properties as Company class and can be used in CustomMap class
export class User implements Mappable {
    firstName: string;
    lastName: string;
    location: {
        lat: number;
        lng: number;
    };

    constructor() {
        this.firstName = randFirstName();
        this.lastName = randLastName();
        this.location = {
            lat: randLatitude(),
            lng: randLongitude(),
        };
    }

    markerContent(): string {
        return `
            <div>
                <h1>User Name: ${this.firstName} ${this.lastName}</h1>
            </div>
        `;
    }
}
