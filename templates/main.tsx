import React from 'react';
import {TemplateProps} from '@flayyer/flayyer-types';
import { VscOrganization,VscIssues,VscStarEmpty,VscRepoForked } from "react-icons/vsc";
import clsx from 'clsx';

import '../styles/tailwind.css';

function Layer({className, ...props}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx('absolute inset-0 w-full h-full', className)}
    />
  );
}

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps) {
  const {width, height, variables} = props;
  const {
    organization = 'flayyer',
    repository = 'create-flayyer-app',
    description = 'Scaffold everything you need to create a https://flayyer.com template | Generate social share images with web technologies',
    logo = 'https://avatars.githubusercontent.com/u/67559670?s=200&v=4',
  } = variables;

  const langs = [
    {name: 'typescript', className: 'bg-cyan-800', weight: 6},
    {name: 'javascript', className: 'bg-yellow-200', weight: 4},
    {name: 'css', className: 'bg-gray-800', weight: 2}
  ];
  const items = [{
    Icon: VscOrganization,
    title: "Contributors",
    count: 2,
  }, {
    Icon: VscIssues,
    title: "Issues",
    count: 1,
  }, {
    Icon: VscStarEmpty,
    title: "Stars",
    count: 13,
  }, {
    Icon: VscRepoForked,
    title: "Forks",
    count: 0,
  }]

  return (
    <>
      <Layer
        className={clsx(
          'bg-white text-gray-500',
          'px-7 pt-10 pb-8',
          'grid grid-cols-12 grid-rows-12 gap-0'
        )}
      >
        <header className="col-span-9 row-span-9">
          <h1 className={clsx('text-3xl tracking-normal text-gray-800')}>
            <span className="">{organization}/</span>
            <span className="font-bold">{repository}</span>
          </h1>
          {description && (
            <p className={clsx("pt-3", "text-base font-light tracking-wide leading-snug text-gray-500")}>
              {description}
            </p>
          )}
        </header>

        <div className={clsx('col-span-3 row-span-10', 'flex flex-col pl-6')}>
          <div className="rounded-md overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={logo}
            />
          </div>
        </div>

        <dl className={clsx("col-span-12 row-span-2", "flex flex-row flex-wrap space-x-6", "leading-none")}>
          {items.map(({ title, count, Icon }, i) => (
            <div key={i} className="flex flex-row space-x-1">
              <div className="flex-grow-0">
                <Icon className="w-4 h-4 text-gray-500" />
              </div>
              <div className="mt-0.5">
                <dt className="text-sm text-gray-700">{count}</dt>
                <dd className="text-xs text-gray-400">{title}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Layer>

      <div className={clsx("absolute bottom-0 left-0 right-0 h-3", "flex flex-row")}>
        {langs.map((lang) => (
          <div
            key={lang.name}
            style={{flex: lang.weight}}
            className={lang.className}
          />
        ))}
      </div>
    </>
  );
}
