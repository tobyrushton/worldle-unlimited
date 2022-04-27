import data from './countries.json'

export interface countryType{
    alpha:string,
    country:string,
    longitude:number,
    latitude:number
}

export type Direction =
    "N"|
    "NNE"|
    "NE"|
    "ENE"|
    "E"|
    "ESE"|
    "SE"|
    "SSE"|
    "S"|
    "SSW"|
    "SW"|
    "WSW"|
    "W"|
    "WNW"|
    "NNW"|
    "NW"|
    "F"; // win 
export type directionEmojis=
    "⬆️"|
    "↗️"|
    "➡️"|
    "↘️"|
    "⬇️"|
    "↙️"|
    "⬅️"|
    "↖️"|
    "🎉";//win emoji

export type countries =
    "Albania"|"Algeria"|"American Samoa"|"Andorra"|"Angola"|"Anguilla"|"Antarctica"|"Antigua and Barbuda"|"Argentina"|"Armenia"|"Aruba"|"Australia"|"Austria"|"Azerbaijan"|"Bahamas"|"Bahrain"|"Bangladesh"|"Barbados"|"Belarus"|"Belgium"|"Belize"|"Benin"|"Bermuda"|"Bhutan"|"Bolivia| Plurinational State of"|"Bosnia and Herzegovina"|"Botswana"|"Bouvet Island"|"Brazil"|"British Indian Ocean Territory"|"Brunei Darussalam"|"Bulgaria"|"Burkina Faso"|"Burundi"|"Cambodia"|"Cameroon"|"Canada"|"Cape Verde"|"Cayman Islands"|"Central African Republic"|"Chad"|"Chile"|"China"|"Christmas Island"|"Cocos (Keeling) Islands"|"Colombia"|"Comoros"|"Congo"|"Congo| the Democratic Republic of the"|"Cook Islands"|"Costa Rica"|"Côte d'Ivoire"|"Croatia"|"Cuba"|"Cyprus"|"Czech Republic"|"Denmark"|"Djibouti"|"Dominica"|"Dominican Republic"|"Ecuador"|"Egypt"|"El Salvador"|"Equatorial Guinea"|"Eritrea"|"Estonia"|"Ethiopia"|"Falkland Islands (Malvinas)"|"Faroe Islands"|"Fiji"|"Finland"|"France"|"French Guiana"|"French Polynesia"|"French Southern Territories"|"Gabon"|"Gambia"|"Georgia"|"Germany"|"Ghana"|"Gibraltar"|"Greece"|"Greenland"|"Grenada"|"Guadeloupe"|"Guam"|"Guatemala"|"Guernsey"|"Guinea"|"Guinea-Bissau"|"Guyana"|"Haiti"|"Heard Island and McDonald Islands"|"Holy See (Vatican City State)"|"Honduras"|"Hong Kong"|"Hungary"|"Iceland"|"India"|"Indonesia"|"Iran| Islamic Republic of"|"Iraq"|"Ireland"|"Isle of Man"|"Israel"|"Italy"|"Jamaica"|"Japan"|"Jersey"|"Jordan"|"Kazakhstan"|"Kenya"|"Kiribati"|"North Korea"|"South Korea"|"Kuwait"|"Kyrgyzstan"|"Lao People's Democratic Republic"|"Latvia"|"Lebanon"|"Lesotho"|"Liberia"|"Libyan Arab Jamahiriya"|"Liechtenstein"|"Lithuania"|"Luxembourg"|"Macao"|"Macedonia| the former Yugoslav Republic of"|"Madagascar"|"Malawi"|"Malaysia"|"Maldives"|"Mali"|"Malta"|"Marshall Islands"|"Martinique"|"Mauritania"|"Mauritius"|"Mayotte"|"Mexico"|"Micronesia| Federated States of"|"Moldova| Republic of"|"Monaco"|"Mongolia"|"Montenegro"|"Montserrat"|"Morocco"|"Mozambique"|"Myanmar"|"Namibia"|"Nauru"|"Nepal"|"Netherlands"|"Netherlands Antilles"|"New Caledonia"|"New Zealand"|"Nicaragua"|"Niger"|"Nigeria"|"Niue"|"Norfolk Island"|"Northern Mariana Islands"|"Norway"|"Oman"|"Pakistan"|"Palau"|"Palestinian Territory| Occupied"|"Panama"|"Papua New Guinea"|"Paraguay"|"Peru"|"Philippines"|"Pitcairn"|"Poland"|"Portugal"|"Puerto Rico"|"Qatar"|"Réunion"|"Romania"|"Russian Federation"|"Rwanda"|"Saint Helena| Ascension and Tristan da Cunha"|"Saint Kitts and Nevis"|"Saint Lucia"|"Saint Pierre and Miquelon"|"Saint Vincent and the Grenadines"|"Samoa"|"San Marino"|"Sao Tome and Principe"|"Saudi Arabia"|"Senegal"|"Serbia"|"Seychelles"|"Sierra Leone"|"Singapore"|"Slovakia"|"Slovenia"|"Solomon Islands"|"Somalia"|"South Africa"|"South Georgia and the South Sandwich Islands"|"Spain"|"Sri Lanka"|"Sudan"|"Suriname"|"Svalbard and Jan Mayen"|"Eswatini"|"Sweden"|"Switzerland"|"Syrian Arab Republic"|"Taiwan| Province of China"|"Tajikistan"|"Tanzania| United Republic of"|"Thailand"|"Timor-Leste"|"Togo"|"Tokelau"|"Tonga"|"Trinidad and Tobago"|"Tunisia"|"Turkey"|"Turkmenistan"|"Turks and Caicos Islands"|"Tuvalu"|"Uganda"|"Ukraine"|"United Arab Emirates"|"United Kingdom"|"United States"|"United States Minor Outlying Islands"|"Uruguay"|"Uzbekistan"|"Vanuatu"|"Venezuela| Bolivarian Republic of"|"Viet Nam"|"Virgin Islands| British"|"Virgin Islands| U.S."|"Wallis and Futuna"|"Western Sahara"|"Yemen"|"Zambia"|"Zimbabwe"|"Afghanistan"|"Kosovo";


const directionArrows: Record<Direction, directionEmojis> = {
    N: "⬆️",
    NE: "↗️",
    NNE: "↗️",
    ENE: "↗️",
    E: "➡️",
    SE: "↘️",
    SSE: "↘️",
    ESE: "↘️",
    S: "⬇️",
    SW: "↙️",
    SSW: "↙️",
    WSW: "↙️",
    W: "⬅️",
    NW: "↖️",
    NNW: "↖️",
    WNW: "↖️",
    F:"🎉"
}


export default class Country{
    alpha:string
    country:string
    longitude:number
    latitude:number

    constructor(country:countryType){
        this.alpha = country.alpha
        this.country = country.country
        this.longitude = country.longitude
        this.latitude = country.latitude
    }


    getDistanceToCountry(country:countryType):number{
        //using haversines formula to calculate the distance between the two countries using the longitudes and latitudes
        var p = 0.017453292519943295;    
        var c = Math.cos;
        var a = 0.5 - c((country.latitude - this.latitude) * p)/2 + 
                c(this.latitude * p) * c(country.latitude * p) * 
                (1 - c((country.longitude - this.longitude) * p))/2;
      
        return Math.floor(12742 * Math.asin(Math.sqrt(a)))
    }

    getDirectionToCountry(country:countryType):directionEmojis{
        if(this.latitude === country.latitude && this.longitude === country.longitude) return directionArrows['F']
        const getDegree = ():Direction =>{
            const cardinals:Direction[] = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]; 
            const carDirect = (x0:number,y0:number, x1:number,y1:number) => Math.round( Math.atan2((x1-x0),(y1-y0)) * (8 / Math.PI) ); 
            const cardIndex = (dir:number) => dir<0 ? dir+16 : dir; 
            return cardinals[cardIndex(carDirect( country.longitude,country.latitude, this.longitude,this.latitude))]
        }
        return directionArrows[getDegree()]
    }

    getPercentage(distance:number):number{
        const maxDistance = 20000; //half the earths circumference
        return Math.floor(((maxDistance-distance)/maxDistance)*100)
    }
}

export const getCountry = (key:number):countryType=>{
    const json = data
    return json[key]
}