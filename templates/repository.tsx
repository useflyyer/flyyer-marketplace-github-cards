import React from 'react';
import {TemplateProps} from '@flayyer/flayyer-types';
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

import {Variable as V, Validator} from '@flayyer/variables';

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  owner: V.String({
    title: 'Owner',
    description: 'Organization identifier or Username',
    default: 'flayyer',
    examples: ['flayyer']
  }),
  repo: V.String({
    title: 'Repository',
    description: 'Repository identifier',
    default: 'create-flayyer-app',
    examples: ['create-flayyer-app']
  }),
  avatar: V.Image({
    title: 'Avatar URL',
    examples: ['https://avatars.githubusercontent.com/u/67559670']
  }),
  langs: V.Optional(
    V.Dict(V.Integer({description: 'Weight'}), {
      examples: [{Typescript: 10, JavaScript: 2, CSS: 1}]
    })
  ),
  description: V.Optional(V.String({description: 'Repository description'})),
  contributors: V.Integer({description: 'Contributors count'}),
  stars: V.Optional(V.Integer({description: 'Stargazers count'})),
  forks: V.Optional(V.Integer({description: 'Forks count'})),
  issues: V.Optional(V.Integer({description: 'Open issues count'}))
});

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function RepositoryTemplate(props: TemplateProps) {
  const {width, height, variables} = props;
  if (!validator.validate(variables)) {
    return null; // TODO: Fallback for invalid.
  }

  const {
    owner,
    repo,
    langs,
    avatar,
    description,
    contributors,
    stars,
    forks,
    issues
  } = variables;

  const stats = [
    {Icon: VscOrganization, title: 'Contributors', count: contributors},
    {Icon: VscIssues, title: 'Issues', count: issues},
    {Icon: VscStarEmpty, title: 'Stars', count: stars},
    {Icon: VscRepoForked, title: 'Forks', count: forks}
  ];

  return (
    <>
      <Layer
        className={clsx(
          'bg-white text-gray-500',
          'px-7 pt-10 pb-8 story:py-storysafe',
          'grid grid-cols-12 grid-rows-12 gap-x-5'
        )}
      >
        <header className="col-span-9 row-span-10 sq:col-span-12 sq:row-span-8">
          <h1
            className={clsx(
              'sq:mt-4',
              'text-3xl story:text-4xl tracking-normal text-gray-800'
            )}
          >
            <span className="">{owner}/</span>
            <span className="font-bold">{repo}</span>
          </h1>

          <p
            className={clsx(
              'pt-3',
              'text-base story:text-lg font-light tracking-wide leading-snug text-gray-500'
            )}
          >
            {description}
          </p>
        </header>

        <div
          className={clsx(
            'col-span-3 row-span-10 sq:col-span-12 sq:row-span-4 story:row-span-3 sq:order-first',
            'flex flex-col'
          )}
        >
          {avatar && (
            <div className="flex-1">
              <img
                className="rounded-md sq:rounded-lg overflow-hidden w-full sq:w-auto sq:h-full object-contain"
                src={avatar}
              />
            </div>
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
                <Icon className="w-4 h-4 sq:w-6 sq:h-6 text-gray-500" />
              </div>
              <div className="mt-0.5">
                <dt className="text-sm sq:text-base text-gray-700">
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
    </>
  );
}
