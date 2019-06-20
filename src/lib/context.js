import injector from '@eryue/injector';
import resBody from '../helper/resBody';
import {CONFIG, SERVICE, ERYUE_CONFIG} from './context-names';

export default function() {
  const cx = this.context;
  const [config, service] = injector.resolve(CONFIG, SERVICE);
  const helper = {
    success() {
      resBody(true).apply(cx, arguments);
    },
    failed() {
      resBody(false).apply(cx, arguments);
    }
  }

  const eryueContext = {
    config,
    service,
    helper
  }

  Object.assign(cx, eryueContext);
}