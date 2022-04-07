import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { MapExcelThreshold } from '../components/MapConstants';
import { mapExcelDownload } from '../components/MapHelpers';
import Button from '@mui/material/Button';
import './styles/VaccinationWriteUp.css';

interface Props {
  doseType: string;
  bookName: string;
  featureData: any[];
  valueName: string;
  thresholds: MapExcelThreshold[];
}

const DistributionWriteUp: React.FC<Props> = ({
  doseType,
  bookName,
  featureData,
  valueName,
  thresholds,
}) => {
  const { t } = useTranslation();

  if (featureData === null || featureData === undefined) return null;

  let herdImmunityAndBooster: number = 0;
  let herdImmunity: number = 0;
  let insufficientVaccines: number = 0;

  featureData.forEach((country) => {
    if (country[valueName] >= 120) {
      herdImmunityAndBooster++;
    } else if (country[valueName] >= 100) {
      herdImmunity++;
    } else {
      insufficientVaccines++;
    }
  });

  let length = featureData.length;
  herdImmunity = Math.floor((herdImmunity / length) * 100);
  herdImmunityAndBooster = Math.floor((herdImmunityAndBooster / length) * 100);
  insufficientVaccines = Math.floor((insufficientVaccines / length) * 100);

  const downloadExcel = () => {
    mapExcelDownload(bookName, featureData, valueName, thresholds);
  };

  return (
    <>
      <Trans
        i18nKey='distributionTab.mapWriteUp'
        doseType={doseType}
        herdImmunityAndBooster={herdImmunityAndBooster}
        herdImmunity={herdImmunity}
        insufficientVaccines={insufficientVaccines}
      >
        The {{ doseType }} doses that each country has at the moment, about
        {{ herdImmunityAndBooster }}% of the countries have enough doses to
        fully vaccinate the country's and additional booster shots,
        {{ herdImmunity }}% have enough doses to reach herd immunity /
        protection, while {{ insufficientVaccines }}% of countries don't have
        sufficient doses to reach the threshold. A full list of countries in
        each category is available for download
      </Trans>{' '}
      <Button
        id='downloadExcel'
        variant='text'
        onClick={downloadExcel}
        color='secondary'
      >
        {t('here')}
      </Button>
      .
    </>
  );
};

export default DistributionWriteUp;
