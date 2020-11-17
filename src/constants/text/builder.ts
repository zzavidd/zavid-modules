import * as zText from './formatting';

export default class zTextBuilder {
  private text: unknown;

  constructor(text: string) {
    this.text = text;
  }

  formatText(options?: zText.FormatOptions): zTextBuilder {
    this.text = zText.formatText(this.text as string, options);
    return this;
  }

  deformatText(options?: zText.DeformatOptions): zTextBuilder {
    this.text = zText.deformatText(this.text as string, options);
    return this;
  }

  applySubstitutions(substitutions: zText.Substitutions): zTextBuilder {
    this.text = zText.applySubstitutions(this.text as string, substitutions);
    return this;
  }

  truncateText(options?: zText.TruncateOptions) {
    this.text = zText.truncateText(this.text as string, options);
    return this;
  }

  build(): unknown {
    return this.text;
  }
}
