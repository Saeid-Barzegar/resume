import React from 'react';
import { FormattedMessage } from 'react-intl';

interface SectionPropType {
  sectionId: string;
  title: string;
  children: React.ReactNode;
  className: string;
}
const Section: React.FC<SectionPropType> = ({
  sectionId = "",
  title = "",
  children,
  className = ""
}) => {
  const scrollTopHandler = () => window.scrollTo(0, 0)
  return (
    <section id={sectionId} className={`${className}`}>
      <button className='cursor-pointer' onClick={scrollTopHandler}>
        <h2><FormattedMessage id={title} /></h2>
      </button>
      <div className='ltr:pl-2 rtl:pr-2'>
        {children}
      </div>
    </section>
  )
}

export default Section;
