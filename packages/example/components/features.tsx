import type React from 'react';

import Icon1 from '../icons/Icon1';
import Icon2 from '../icons/Icon2';
import Icon3 from '../icons/Icon3';
import Icon4 from '../icons/Icon4';
import Icon5 from '../icons/Icon5';
import Icon6 from '../icons/Icon6';
import Icon7 from '../icons/Icon7';
import Icon8 from '../icons/Icon8';

import styles from './features.module.css';

const Feature = ({ text, icon }: { text: string; icon: React.ReactNode }) => (
  <div className={styles.feature}>
    {icon}
    <h4>{text}</h4>
  </div>
);

const featureLabels: Record<number, string> = {
  1: 'Touch Gesture',
  2: 'Feedback Animation',
  3: 'Image Adaptation',
  4: 'Custom Element',
  5: 'Keyboard Navigation',
  6: 'Based on TypeScript',
  7: 'Lightweight',
  8: 'More...',
};

const iconList = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8];

export default function Features() {
  return (
    <div className="mx-auto max-w-full w-[880px] text-center px-4 mb-10">
      <p className="text-lg mb-2 text-gray-600 md:text-2xl">A beautiful photo preview component</p>
      <div className={styles.features}>
        {iconList.map((Icon, i) => (
          <Feature key={i} text={featureLabels[i + 1]} icon={<Icon />} />
        ))}
      </div>
    </div>
  );
}
