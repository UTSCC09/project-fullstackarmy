import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useTranslation } from 'react-i18next';
import bgdImg from '../../media/bgd.gif';
import immunityImg from '../../media/herdimmunity.gif';
import hopeImg from '../../media/hope.png';
import populationImg from '../../media/populationimmunity.jpeg';
import protectionImg from '../../media/protection.jpeg';
import protocolsImg from '../../media/protocols.jpeg';
import stopCovidImg from '../../media/stopcovid.png';
import upImg from '../../media/up.webp';
import vaccineImg from '../../media/vaccination.jpeg';
import InfoCard from '../InfoCard';

export const InfoTab = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Parallax pages={8} style={{}}>
        {/* layer 1 - title */}
        <ParallaxLayer
          speed={2.5}
          offset={0}
          style={{
            backgroundImage: `url(${bgdImg})`,
            backgroundSize: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#2148c0',
          }}
        >
          <h3>{t('infotab.p1.title')}</h3>
          <h1 style={{ fontSize: '30px' }}>{t('infotab.p1.question')}</h1>
          <img
            src={upImg}
            alt='upImg'
            style={{ width: '140.5px', height: '150px' }}
          ></img>
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 1, end: 7 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <img
            src={immunityImg}
            alt='immunityImg'
            style={{ width: '482.25px', height: '337.5px' }}
          ></img>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <InfoCard
            img={populationImg}
            title={t('infotab.p2.title')}
            body={t('infotab.p2.def')}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <InfoCard
            img={vaccineImg}
            title={t('infotab.p3.title')}
            body={t('infotab.p3.desc')}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <InfoCard
            img={stopCovidImg}
            title={t('infotab.p4.title')}
            body={t('infotab.p4.desc')}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={5}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <InfoCard
            img={protocolsImg}
            title={t('infotab.p5.title')}
            body={t('infotab.p5.desc')}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={6}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <InfoCard
            img={protectionImg}
            title={t('infotab.p6.title')}
            body={t('infotab.p6.desc')}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={7}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <InfoCard
            img={hopeImg}
            title={t('infotab.p7.title')}
            body={t('infotab.p7.desc')}
          />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
