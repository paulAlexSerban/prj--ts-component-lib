import { Company } from "./_google-maps-random-user-address/Company";
import { User } from "./_google-maps-random-user-address/User";
import { CustomMap } from "./_google-maps-random-user-address/CustomMap";

const company = new Company();
const user = new User();
const customMap = new CustomMap("map");
customMap.addMarker(user);
customMap.addMarker(company);