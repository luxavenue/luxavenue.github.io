import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link: string;
  buttonLabel: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '정품보증서 생성',
    Svg: require('@site/static/img/estimate-genuine-icon.svg').default,
    description: (
      <>
        입력한 정보를 바탕으로 정품보증서를 이미지 또는 PDF로 다운로드할 수 있습니다.
      </>
    ),
    link: '/docs/Tools/estimate-genuine',
    buttonLabel: '정품보증서 만들기',
  },
  {
    title: '위조품 확인서',
    Svg: require('@site/static/img/estimate-imitation-icon.svg').default,
    description: (
      <>
        위조품 판단 결과를 이미지 또는 PDF로 출력하여 보관할 수 있습니다.
      </>
    ),
    link: '/docs/Tools/estimate-imitation',
    buttonLabel: '위조품 확인서 작성',
  },
  {
    title: '수수료 계산기',
    Svg: require('@site/static/img/calculator-icon.svg').default,
    description: (
      <>
        오픈마켓 또는 해외 채널에 따른 판매 수수료를 자동으로 계산합니다.
      </>
    ),
    link: '/docs/Tools/calculator-domestic',
    buttonLabel: '계산기 바로가기',
  },
];

function Feature({ title, Svg, description, link, buttonLabel }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureItem)}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link
          className={clsx("button button--primary margin-top--sm", styles.enlargedButton)}
          to={link}
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
