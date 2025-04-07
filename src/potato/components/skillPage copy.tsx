import React, { useEffect, useState } from 'react';
import styles from '../../styles/industry.module.css';

interface IndustryItemProps {
  key?: number;
  title: string;
  description: string;
  link: string;
}

const IndustryItem = ({ title, description, link }: IndustryItemProps) => {
  return (
    <div className={styles['industry-item']}>
      <a href={link} className={styles['industry-content']}>
        <h3 className={styles['industry-title']}>{title}</h3>
        <p className={styles['industry-description']} dangerouslySetInnerHTML={{ __html: description }}></p>
        <div className={styles['industry-arrow']}>
          <i className="xi-arrow-right"></i>
        </div>
      </a>
    </div>
  );
};

export const IndustrySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const industryItems = [
    {
      title: "메타 데이터",
      description: "효과적인<br>치매 예방을 위한 데이터 분석",
      link: "#"
    },
    {
      title: "메타 데이터",
      description: "효과적인<br>치매 예방을 위한 데이터 분석",
      link: "#"
    },
    {
      title: "메타 데이터",
      description: "효과적인<br>치매 예방을 위한 데이터 분석",
      link: "#"
    },
    {
      title: "메타 데이터",
      description: "효과적인<br>치매 예방을 위한 데이터 분석",
      link: "#"
    }
  ];

  return (
    <article className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={styles['area-box']}>
        <div className={styles['main-tit-box']}>
          <h2 className={styles['main-tit']}>what</h2>
          <p className={styles['main-sub-tit']}>
          전문 데이터 처리 기술을 통해<br />
          미래를 예측하고 혁신을 위한 새로운 가치를 발굴합니다.
          </p>
        </div>
      </div>

      <div className={styles['industry-con']}>
        <div className={styles['industry-list']}>
          {industryItems.map((item, index) => (
            <IndustryItem
              key={index}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </article>
  );
};
