import React, { useState } from 'react';
import { TbChevronDown } from 'react-icons/tb';
import { FormattedMessage } from 'react-intl';

type DataType = {
  id: number;
  icon?: React.ReactElement
  label: string;
  value: string;
  onSelect: (value: string) => void;
}
interface DropDownButtonPropTypes {
  label: string;
  className?: string;
  data: DataType[];
}
const DropDownButton: React.FC<DropDownButtonPropTypes> = ({
  label = '',
  data = [],
  className = "",
}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onSelectHandler = ({ value, onSelect }: DataType) => {
    onSelect(value)
    setIsOpen(false)
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button type="button" onClick={() => setIsOpen(state => !state)} className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
          <span className='md:mb-1'><FormattedMessage id={label} /></span>
          <TbChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>
      {isOpen && (
        <div role="menu" className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {data.map((item: DataType) => (
            <div key={item.id} className="group py-1 flex cursor-pointer" role="none" onClick={() => onSelectHandler(item)}>
              <span className='flex items-center justify-center ltr:pl-3 rtl:pr-3 group-hover:text-cyan-600'>{item.icon}</span>
              <span className="block px-4 py-2 text-sm text-gray-700  group-hover:text-cyan-600">{item.label}</span>
            </div>
          ))}
        </div>
      )
      }
    </div >
  )
}

export default DropDownButton;
