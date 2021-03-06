import React from 'react';
import {TemplateProps} from '@flyyer/types';
import { proxy } from "@flyyer/proxy";
import {
  VscOrganization,
  VscIssues,
  VscStarEmpty,
  VscRepoForked
} from 'react-icons/vsc';
import clsx from 'clsx';

import '../styles/tailwind.css';

import {Layer} from '../components/layer';
import {Language} from '../components/language';

import {Variable as V, Validator} from '@flyyer/variables';

/**
 * Export to enable variables UI on Flyyer.io
 */
export const schema = V.Object({
  title: V.String({
    description: 'Owner and repo joined by a slash "/"',
    default: 'flyyer/create-flyyer-app',
    examples: ['flyyer/create-flyyer-app']
  }),
  description: V.String({
    description: 'Repository description',
    default: 'Scaffold everything you need to create a https://flyyer.io template.',
    examples: [
      'Scaffold everything you need to create a https://flyyer.io template | Generate social share images with web technologies.'
    ]
  }),
  avatar: V.Image({
    title: 'Avatar URL',
    default: 'https://avatars.githubusercontent.com/u/67559670',
    examples: ['https://avatars.githubusercontent.com/u/67559670']
  }),
  langs: V.Optional(
    V.Dict(V.Integer({description: 'Weight'}), {
      examples: [{TypeScript: 10, JavaScript: 2, CSS: 1}]
    })
  ),
  contributors: V.Optional(
    V.Integer({description: 'Contributors count', examples: [2]})
  ),
  stars: V.Optional(
    V.Integer({description: 'Stargazers count', examples: [12]})
  ),
  forks: V.Optional(V.Integer({description: 'Forks count', examples: [1]})),
  issues: V.Optional(
    V.Integer({description: 'Open issues count', examples: [0]})
  )
});

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function RepositoryTemplate({width, height, variables, ...props}: TemplateProps & React.ComponentProps<typeof Layer>) {

  const {
    data: {
      title,
      langs,
      avatar,
      description,
      contributors,
      stars,
      forks,
      issues
    }
  } = validator.parse(variables);

  const [owner, repo] = (title || '').split('/');
  const stats = [
    {Icon: VscOrganization, title: 'Contributors', count: contributors},
    {Icon: VscIssues, title: 'Issues', count: issues},
    {Icon: VscStarEmpty, title: 'Stars', count: stars},
    {Icon: VscRepoForked, title: 'Forks', count: forks}
  ];

  // Just for simplicity, depend on explicit width and height instead of using Tailwind breakpoints.
  if (width <= 400 && height <= 400) {
    return (
      <Layer className="bg-white p-4">
        <img className="rounded-md w-full h-full object-contain" src={proxy(avatar)} />
      </Layer>
    );
  }

  return (
    <Layer {...props}>
      <Layer
        className={clsx(
          'bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-300',
          'px-7 pt-10 pb-8 story:py-storysafe',
          'grid grid-cols-12 grid-rows-12 gap-x-5'
        )}
      >
        <header className="col-span-9 row-span-10 sq:col-span-12 sq:row-span-8">
          <h1
            className={clsx(
              'sq:mt-4',
              'text-3xl story:text-4xl tracking-normal text-gray-800 dark:text-gray-100'
            )}
          >
            <span className="">{owner}</span>
            {owner && repo && <span>/</span>}
            <span className="font-bold">{repo}</span>
          </h1>

          <p
            className={clsx(
              'pt-3',
              'text-base story:text-lg font-light tracking-wide leading-snug text-gray-500 dark:text-gray-400'
            )}
          >
            {description}
          </p>
        </header>

        <div
          className={clsx(
            'col-span-3 row-span-10 sq:col-span-12 sq:row-span-4 story:row-span-3 sq:order-first'
          )}
        >
          {avatar && (
            <img
              className="inline rounded-md sq:rounded-lg overflow-hidden w-full sq:w-auto sq:h-full object-contain"
              src={proxy(avatar)}
            />
          )}
        </div>

        <dl
          className={clsx(
            'col-span-12 row-span-2',
            'flex flex-row flex-wrap space-x-6',
            'leading-none'
          )}
        >
          {stats.map(({title, count, Icon}, i) => (
            <div key={i} className="flex flex-row space-x-1 sq:space-x-2">
              <div className="flex-grow-0">
                <Icon className="w-4 h-4 sq:w-6 sq:h-6 text-gray-500 dark:text-gray-200" />
              </div>
              <div className="mt-0.5">
                <dt className="text-sm sq:text-base text-gray-700 dark:text-gray-100">
                  {Number.isFinite(count) ? count : '-'}
                </dt>
                <dd className="text-xs sq:text-base text-gray-400">{title}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Layer>

      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 h-3 story:h-6',
          'flex flex-row'
        )}
      >
        {langs ? (
          Object.entries(langs).map(([name, weight]) => (
            <Language key={name} weight={Number(weight)} name={name} />
          ))
        ) : (
          <Language weight={1} />
        )}
      </div>
    </Layer>
  );
}
