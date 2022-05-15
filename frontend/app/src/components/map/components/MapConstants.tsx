export type MapLegend = [string, string, number][] | null;

export type FeatureData = [isoCode: string, value: number][];

export type MapQueryType = 'countryMapQuery' | 'continentMapQuery';

// also has a value property that is dependent on the query
export type ExcelBookData = {
  isoCodeName: string;
  isoCode: string;
};

export type MapExcelThreshold = {
  sheetName: string;
  lowerBound: number;
  upperBound: number;
};

export const herdImmunityThreshold = 85;
export const VaccinateEntireCountryThreshold = 120;

export const VaccinationThresholds: MapExcelThreshold[] = [
  {
    sheetName: 'Herd Immune',
    lowerBound: herdImmunityThreshold,
    upperBound: 100,
  },
  {
    sheetName: 'Not Herd Immune',
    lowerBound: 0,
    upperBound: herdImmunityThreshold,
  },
];

export const VaccDistribThresholds: MapExcelThreshold[] = [
  {
    sheetName: 'Herd Immunity and Booster',
    lowerBound: VaccinateEntireCountryThreshold,
    upperBound: 999,
  },
  {
    sheetName: 'Herd Immunity Only',
    lowerBound: 100,
    upperBound: VaccinateEntireCountryThreshold,
  },
  {
    sheetName: 'Insufficient Supply',
    lowerBound: 0,
    upperBound: 100,
  },
];

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
  ['#e6f0fe', '0% - 10%', 0],
];

export const ScaledPlusLegend: MapLegend = [
  ['#0446ae', '120+ % ', 100],
  ['#065ae0', '100% - 120%', 100],
  ['#1f74f9', '81% - 100%', 91],
  ['#5193fb', '61% - 80%', 71],
  ['#83b2fc', '41% - 60%', 51],
  ['#b4d1fd', '21% - 40%', 31],
  ['#e6f0fe', '0% - 20%', 0],
];

export const BinaryLegend: MapLegend = [
  ['#0000e6', 'Herd I/P (>85%)', 85],
  ['#ff4d4d', 'Not Herd I/P', 0],
];

export const TernaryLegend: MapLegend = [
  ['#021e4b', '120+%', 120],
  ['#1f74f9', '100% - 120%', 100],
  ['#ff4d4d', '< 100%', 0],
];

export const mapStrokeColor: string = '#fff';

export const isoCodeProperty: string = 'isoCode';
export const isoCodeNameProperty: string = 'isoCodeName';
export const hoverProperty: string = 'hover';
export const isoCodeTypeProperty: string = 'isoCodeType';

export const isoCodeCountryType: string = 'country';
export const isoCodeContinentType: string = 'continent';

export const CountryMapQuery = 'countryMapQuery';
export const ContinentMapQuery = 'continentMapQuery';
