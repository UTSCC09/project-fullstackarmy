import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  herdImmunityThreshold,
  MapExcelThreshold,
} from '../components/MapConstants';
import { mapExcelDownload } from '../components/MapHelpers';
import Button from '@mui/material/Button';
import './styles/VaccinationWriteUp.css';

interface Props {
  dosageLevel: string;
  bookName: string;
  featureData: any[];
  valueName: string;
  thresholds: MapExcelThreshold[];
}

const VaccinationWriteUp: React.FC<Props> = ({
  dosageLevel,
  bookName,
  featureData,
  valueName,
  thresholds,
}) => {
  const { t } = useTranslation();

  if (featureData === null || featureData === undefined) return null;

  let total = featureData.length;
  let numProtected = featureData.reduce((prev, curr) => {
    if (curr[valueName] >= herdImmunityThreshold) return prev + 1;
    return prev;
  }, 0);

  let percentageProtected = Math.floor((numProtected / total) * 100);

  const downloadExcel = () => {
    mapExcelDownload(bookName, featureData, valueName, thresholds);
  };

  return (
    <>
      <Trans
        i18nKey='statusTab.mapWriteUp'
        dosageLevel={dosageLevel}
        numProtected={numProtected}
        percentageProtected={percentageProtected}
      >
        At the {{ dosageLevel }} dose level, {{ numProtected }} of {{ total }}{' '}
        countries ({{ percentageProtected }}% that we have data on) have reached
        the herd immunity / protection threshold. A full list of countries can
        be downloaded
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

export default VaccinationWriteUp;
