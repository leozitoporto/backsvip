import IMailTemplateProvider from '../models/ImailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}

export default FakeMailTemplateProvider;
