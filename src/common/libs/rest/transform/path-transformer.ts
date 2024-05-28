import {inject, injectable} from 'inversify';
import {Component} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {Config, RestSchema} from '../../config/index.js';
import {DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS} from './path-transformer.constant.js';
import {STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE} from '../../../../rest/index.js';
import {getFullServerPath} from '../../../utils/index.js';

function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null;
}

function isExternalLink(link: string): boolean {
  return link.startsWith('http://') || link.startsWith('https://');
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    this.logger.info('Path Transformer created!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  private transform(value: string) {
    const rootPath = this.hasDefaultImage(value) ? STATIC_FILES_ROUTE : STATIC_UPLOAD_ROUTE;
    return `${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}${rootPath}/${value}`;
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key)) {
            if (typeof value === 'string' && !isExternalLink(value)) {
              current[key] = this.transform(value);
            } else if (Array.isArray(value)) {
              current[key] = value.map((currentImage) => typeof currentImage === 'string' && !isExternalLink(currentImage) ? this.transform(currentImage) : currentImage);
            }
          }
        }
      }
    }
    return data;
  }
}
