import React from 'react';
import { isEmpty } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';
import { TbAt, TbBrandLinkedin, TbBrandGithub, TbBrandWhatsapp, TbMapPin } from "react-icons/tb";
import Section from '../components/Section/Section.component';
import { useResumeRef } from '../context/MainContext';
import type {
  ContactItem,
  ContactLinkType,
  Education,
  Experience,
  ListPropTypes,
  Skill,
} from '../types/general';

const List: React.FC<ListPropTypes> = ({ data }) => {

  const {
    name,
    email,
    linkedin,
    github,
    phone,
    address,
    profile,
    experience,
    skills,
    education
  } = data;

  const intl = useIntl();
  const { resumeRef } = useResumeRef();
  const educationSeparator = intl.locale === 'fa' ? '، ' : ', ';

  const getContactHref = (type: ContactLinkType) => {
    switch (type) {
      case 'email':
        return `mailto:${intl.formatMessage({ id: 'email' })}`;
      case 'linkedin':
        return `https://${intl.formatMessage({ id: 'linkedin_profile' })}`;
      case 'github':
        return `https://${intl.formatMessage({ id: 'github_profile' })}`;
      case 'phone': {
        const phoneNumber = intl.formatMessage({ id: 'phone_e164' }).replace(/\D/g, '');
        return `https://wa.me/${phoneNumber}`;
      }
    }
  };

  const contactData: ContactItem[] = [
    {
      id: 0,
      type: 'email' as const,
      icon: <TbAt className='w-6 h-6 mx-2' />,
      label: email,
      external: false,
    },
    {
      id: 1,
      type: 'linkedin' as const,
      icon: <TbBrandLinkedin className='w-6 h-6 mx-2' />,
      label: linkedin,
      external: true,
    },
    {
      id: 2,
      type: 'github' as const,
      icon: <TbBrandGithub className='w-6 h-6 mx-2' />,
      label: github,
      external: true,
    },
    {
      id: 3,
      type: 'phone' as const,
      icon: <TbBrandWhatsapp className='w-6 h-6 mx-2' />,
      label: phone,
      external: true,
    },
    {
      id: 4,
      icon: <TbMapPin className='w-6 h-6 mx-2' />,
      label: address,
      external: false,
    },
  ];

  const formatSkills = (skills: string[]) => {
    const translatedArray = skills.map((skill: string) => intl.formatMessage({ id: skill }))
    return translatedArray.join(', ');
  }

  const renderExperiencesContent = () => (
    <div className='mt-4 p-4'>
      <div className='ltr:pl-6 rtl:pr-6 ltr:border-l rtl:border-r border-gray-200'>
        <div className='space-y-12'>
          {experience.map((item: Experience) => (
            <div key={item.id} className='relative'>
              <span className='absolute top-3 h-2 w-2 rounded-full bg-gray-400 ltr:-left-7 rtl:-right-7' />
              <div className='flex items-start xs:flex-col md:flex-row md:items-center'>
                <h2 className='font-bold mb-0'><FormattedMessage id={item.position} /></h2>
                <p className='flex xs:mx-0 md:ltr:ml-2 md:rtl:mr-2 italic text-cyan-700'>
                  <span>( <FormattedMessage id={item.startDate} /></span>
                  <span className="mx-1">-</span>
                  <span><FormattedMessage id={item.endDate} /> )</span>
                </p>
              </div>
              <div className='flex mt-3 items-start xs:flex-col md:flex-row md:items-center'>
                <h4 className='font-bold text-green-700'><FormattedMessage id={item.company} /></h4>
                {item.website && item.website.map((website: string) => (
                  <a
                    target='_blank'
                    href={`https://${website}`}
                    className='xs:mx-0 md:ltr:ml-2 md:rtl:mr-2 text-cyan-700'
                  >
                    {`( ${website} )`}
                  </a>
                ))}
              </div>
              <div className='my-2'>
                <ul className='list-disc ltr:pl-8 rtl:pr-8'>
                  {item.description.map((describe: string) => (
                    <li key={describe}><FormattedMessage id={describe} /></li>
                  ))}
                </ul>
                {!isEmpty(item.accomplishments) && (
                  <div className='mt-4'>
                    <h3><FormattedMessage id="accomplishments" />:</h3>
                    <ul className='list-disc ltr:pl-8 rtl:pr-8'>
                      {item.accomplishments.map((accomplishment: string) => (
                        <li key={accomplishment}><FormattedMessage id={accomplishment} /></li>
                      ))}
                    </ul>
                  </div>
                )}
                {!isEmpty(item.techStack) && (
                  <div className='pt-4'>
                    <h3><FormattedMessage id="stack" />:</h3>
                    <p className='ltr:pl-4 rtl:pr-4 italic'>
                      <span className='italic'>
                        {formatSkills(item.techStack)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSkillsContent = () => (
    <div className='w-full'>
      {skills.map((skill: Skill) => (
        <div key={skill.id} className='mt-2 w-full'>
          <p className='max-w-full'>
            <span className='mr-3 font-bold'><FormattedMessage id={skill.title} />:</span>
            <span className='italic'>{formatSkills(skill.skills)}</span>
          </p>
        </div>
      ))}
    </div>
  );

  const renderEducationContent = () => (
    <div>
      {education.map((item: Education) => (
        <p key={item.id} className='px-4'>
          <FormattedMessage id={item.degree} />
          {educationSeparator}
          <FormattedMessage id={item.university} />
        </p>
      ))}
    </div>
  );

  const renderContactContent = () => (
    <div>
      {contactData.map(info => {
        const label = <FormattedMessage id={info.label} />;
        const href = 'type' in info ? getContactHref(info.type) : undefined;

        return (
          <span key={info.id} className='flex mb-4 items-center'>
            {info.icon}
            {href ? (
              <a
                href={href}
                target={info.external ? '_blank' : undefined}
                rel={info.external ? 'noopener noreferrer' : undefined}
                className='-mt-1 text-cyan-700 hover:underline'
              >
                {label}
              </a>
            ) : (
              <span className='-mt-1'>{label}</span>
            )}
          </span>
        );
      })}
    </div>
  );

  return (
    <div ref={resumeRef} className='xl:w-2/3 md:w-3/4 sm:w-full xs:w-full pb-8 pt-24 '>
      <div className='w-full h-full px-4 py-2 '>
        <span className='text-sm italic text-gray-600 tracking-wide block -mt-1'>
          <FormattedMessage id="frontend_engineer" />
        </span>
        <h1 className='capitalize mb-0 font-semibold'>
          <FormattedMessage id={name} />
        </h1>
        {/* <div className='flex xs:flex-col md:flex-row w-full mt-10'>
          {contactData.map(info => (
            <span key={info.id} className='flex flex-1 content-center xs:justify-start md:justify-center'>
              {info.icon}
              <FormattedMessage id={info.label} />
            </span>
          ))}
        </div> */}
      </div>
      <div className='px-4 py-2 mt-8'>
        <Section
          sectionId='profile'
          title="profile"
          className="mt-2"
        >
          <p className='px-4'><FormattedMessage id={profile} /></p>
        </Section>

        <Section
          sectionId='experience'
          title="proffessional_experiences"
          className="mt-8"
        >
          {renderExperiencesContent()}
        </Section>

        <Section
          sectionId='skills'
          title="skills"
          className="mt-8"
        >
          {renderSkillsContent()}
        </Section>
        <Section
          sectionId='education'
          title="education"
          className="mt-10"
        >
          {renderEducationContent()}
        </Section>

        <Section
          sectionId='contact'
          title="contact"
          className="mt-10"
        >
          {renderContactContent()}
        </Section>
      </div>
    </div>
  )
}

export default List