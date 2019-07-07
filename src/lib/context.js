import injector from '@eryue/injector';
import resBody from '../helper/resBody';
import {CONFIG, SERVICE, MODEL, ERYUE_CONTEXT} from './context-names';

export default function createEryueContext(cx) {
  const [config, service, model] = injector.resolve(CONFIG, SERVICE, MODEL);
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
    model,
    helper
  }

  injector.add(ERYUE_CONTEXT, eryueContext);

}