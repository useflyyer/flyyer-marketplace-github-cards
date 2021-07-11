import React from 'react';
import { TemplateProps } from "@flyyer/types";

export { schema } from "./repository";
import RepositoryTemplate from "./repository"

export default function RepositoryTemplateDark(props: TemplateProps) {
  return <RepositoryTemplate className="dark" {...props} />
}
