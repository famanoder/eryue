import injector from '@eryue/injector';
import resBody from '../helper/resBody';
import {CONFIG, SERVICE, ERYUE_CONFIG} from './context-names';

export default function() {
  const cx = this.context;
  const [config, service] = injector.resolve(CONFIG, SERVICE);
  const success = function() {
    resBody(true).apply(cx, arguments);
  }
  const failed = function() {
    resBody(false).apply(cx, arguments);
  }

  cx[ERYUE_CONFIG] = {
    config,
    service,
    success,
    failed
  }

}