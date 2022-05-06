import Country, { getCountry } from '../domain/countries'

test('get country by name', ()=>{
    expect(getCountry('United Arab Emirates')).toStrictEqual({country:"United Arab Emirates",alpha:"AE",latitude:24,longitude:54})
    expect(getCountry('Christmas Island')).toStrictEqual({country:"Christmas Island",alpha:"CX",latitude:-10.5,longitude:105.6667})
    expect(getCountry('Gabon')).toStrictEqual({country:"Gabon",alpha:"GA",latitude:-1,longitude:11.75})
    expect(getCountry('Australia')).toStrictEqual({country:"Australia",alpha:"AU",latitude:-27,longitude:133})
})

test('get country by index',()=>{
    expect(getCountry(134)).toStrictEqual({alpha: "MG",country: "Madagascar",latitude: -20,longitude: 47})
    expect(getCountry(212)).toStrictEqual({alpha: "TO",country: "Tonga",latitude: -20,longitude: -175})
    expect(getCountry(35)).toStrictEqual({alpha: "CC",country: "Cocos (Keeling) Islands",latitude: -12.5,longitude: 96.8333})
    expect(getCountry(89)).toStrictEqual({alpha: "HK",country: "Hong Kong",latitude: 22.25,longitude: 114.1667})
})

test('get distance to country', ()=>{
    const country = new Country(getCountry('United Kingdom'))
    expect(country.getDistanceToCountry({country: 'Afghanistan', alpha: 'AF', latitude: 33, longitude: 65})).toBe(5638)
    expect(country.getDistanceToCountry({country: 'Antigua and Barbuda', alpha: 'AG', latitude: 17.05, longitude: -61.8})).toBe(6524)
    expect(country.getDistanceToCountry({country: 'Australia', alpha: 'AU', latitude: -27, longitude: 133})).toBe(15292)
    expect(country.getDistanceToCountry({country: 'Serbia', alpha: 'RS', latitude: 44, longitude: 21})).toBe(1998)
    expect(country.getDistanceToCountry({country:"United Kingdom",alpha:"GB",latitude:54,longitude:-2})).toBe(0)
})

test('get direction to country', ()=>{
    const country = new Country(getCountry('Fiji'))
    expect(country.getDirectionToCountry({country: 'Fiji', alpha: 'FJ', latitude: -18, longitude: 175})).toBe('🎉')
    expect(country.getDirectionToCountry({country:"New Zealand",alpha:"NZ",latitude:-41,longitude:174})).toBe('⬆️')
    expect(country.getDirectionToCountry({country:"Australia",alpha:"AU",latitude:-27,longitude:133})).toBe('↗️')
    expect(country.getDirectionToCountry({country:"Cook Islands",alpha:"CK",latitude:-21.2333,longitude:-159.7667})).toBe('⬅️')
})