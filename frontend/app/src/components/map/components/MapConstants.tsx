export type MapLegend = [string, string, number][] | null;

export type FeatureData = [isoCode: string, value: number][];

export type MapQueryType = 'countryMapQuery' | 'continentMapQuery';

export const ScaledLegend: MapLegend = [
    ['#010a19', '91% - 100%', 91],
    ['#021e4b', '81% - 90%', 81],
    ['#03327c', '71% - 80%', 71],
    ['#0446ae', '61% - 70%', 61],
    ['#065ae0', '51% - 60%', 51],
    ['#1f74f9', '41% - 50%', 41],
    ['#5193fb', '31% - 40%', 31],
    ['#83b2fc', '21% - 30%', 21],
    ['#b4d1fd', '11% - 20%', 11],
    ['#e6f0fe', '0% - 10%', 0]
];

export const BinaryLegend: MapLegend = [
    ['#80ff80', 'Herd I/P (>85%)', 85],
    ['#ff4d4d', 'Not Herd I/P', 0],
];

export const isoCodeProperty: string = 'isoCode';

export const isoCodeNameProperty: string = 'isoCodeName';

export const CountryFeaturesURL = 'https://raw.githubusercontent.com/mohamed-tayeh/geojson-data/main/countryFeatures.json';
export const ContinentFeaturesURL = 'https://raw.githubusercontent.com/mohamed-tayeh/geojson-data/main/continentFeatures.json';

export const CountryMapQuery = 'countryMapQuery';
export const ContinentMapQuery = 'continentMapQuery';