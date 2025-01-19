import React, { useState } from 'react'
import { useLanguage } from '../../context/IntlProviderContext'
import { FormattedMessage } from 'react-intl';
import { TbFileWord, TbFileTypePdf } from 'react-icons/tb';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { ICONS } from '../../constants/icons';
import DropDownButton from '../DropDownButton/DropDownButton.component';

interface NavigationPropType { }

const Navigation: React.FC<NavigationPropType> = ({ }) => {

  const { language, switchLanguage } = useLanguage();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const menu = [
    {
      id: 0,
      label: 'menu_profile',
      link: '#profile'
    },
    {
      id: 1,
      label: 'menu_experience',
      link: '#experience'
    },
    {
      id: 2,
      label: 'menu_skills',
      link: '#skills'
    },
    {
      id: 3,
      label: 'menu_education',
      link: '#education'
    },
    {
      id: 4,
      label: 'menu_contact',
      link: '#contact'
    },
  ];

  const renderSelectLanguage = () => (
    <div className='px-4 flex justify-center items-center'>
      {language === 'fa' ? (
        <button
          className='mx-4 flex items-center'
          onClick={() => switchLanguage('en')}
        >
          <img src={ICONS.EN} alt='' className='size-8' />
        </button>
      ) : (
        <button
          className='mx-4 flex items-center'
          onClick={() => switchLanguage('fa')}
        >
          <img src={ICONS.IR} alt='' className='size-8' />
        </button>
      )}
    </div>
  );

  const renderTopRightContent = () => (
    <>
      <DropDownButton
        label='download'
        data={data}
      />
      {renderSelectLanguage()}
    </>
  )

  const files = {
    WORD: '/files/SAEID_BARZEGAR_CV.docx',
    PDF: '/files/SAEID_BARZEGAR_CV.pdf',
  };

  const downloadHandler = (type: 'WORD' | 'PDF') => {
    const fileUrl = files[type];
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || ''// Automatically use the file name from the path
    link.click();
  }

  const data = [
    {
      id: 0,
      icon: < TbFileWord className='size-5' />,
      label: 'Word',
      value: 'word',
      onSelect: () => downloadHandler("WORD")
    },
    {
      id: 1,
      icon: <TbFileTypePdf className='size-5' />,
      label: 'PDF',
      value: 'pdf',
      onSelect: () => downloadHandler("PDF")
    },
  ];

  return (
    <nav className='w-full bg-gray-100 absolute'>
      <div className='w-full h-20 flex border-b border-gray-300 xs:absolute md:hidden'>
        <div className='flex-1'>
          <button
            className='flex h-full px-6 items-center'
            onClick={() => setOpenMenu(state => !state)}
          >
            {
              openMenu
                ? <RxCross1 className='size-7 text-gray-500' />
                : <RxHamburgerMenu className='size-7 text-gray-500' />
            }
          </button>
        </div>
        <div className='flex justify-center items-center'>
          {renderTopRightContent()}
        </div>
      </div>
      <div className='flex xs:px-0 md:px-4 xs:flex-col md:flex-row xs:mt-20 md:mt-0'>
        <div className={`${openMenu ? "xs:flex" : "xs:hidden"} md:flex flex-1 xs:flex-col md:flex-row`}>
          {menu.map((item: any) => (
            <a
              key={item.id}
              href={item.link}
              onClick={() => setOpenMenu(false)}
              className='flex xs:h-14 md:h-20 px-5 justify-center items-center cursor-pointer hover:bg-gray-200 text-gray-500 hover:text-sky-800 xs:border-b xs:border-solid xs:border-gray-200'>
              <FormattedMessage id={item.label} />
            </a>
          ))}
        </div>
        <div className='xs:hidden md:flex md:justify-center items-center'>
          {renderTopRightContent()}
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
