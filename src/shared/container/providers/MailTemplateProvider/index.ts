import { container } from 'tsyringe';

import ImailTemplateProvider from './models/ImailTemplateProvider';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<ImailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
