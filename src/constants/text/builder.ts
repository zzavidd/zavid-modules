import {
  applySubstitutions,
  deformatText,
  DeformatTextOptions,
  formatText,
  FormatTextOptions,
  TruncateOptions,
  truncateText
} from './functions';

export default class zTextBuilder {
  private text: unknown;

  constructor(text: string) {
    this.text = text;
  }

  formatText(options?: FormatTextOptions): zTextBuilder {
    this.text = formatText(this.text as string, options);
    return this;
  }

  deformatText(options?: DeformatTextOptions): zTextBuilder {
    this.text = deformatText(this.text as string, options);
    return this;
  }

  applySubstitutions(substitutions: Record<string, string>): zTextBuilder {
    this.text = applySubstitutions(this.text as string, substitutions);
    return this;
  }

  truncateText(options?: TruncateOptions): zTextBuilder {
    this.text = truncateText(this.text as string, options);
    return this;
  }

  build(): unknown {
    return this.text;
  }
}
