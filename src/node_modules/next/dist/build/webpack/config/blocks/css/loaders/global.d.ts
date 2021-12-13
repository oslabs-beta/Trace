import { AcceptedPlugin } from 'postcss';
import { webpack } from 'next/dist/compiled/webpack/webpack';
import { ConfigurationContext } from '../../../utils';
export declare function getGlobalCssLoader(ctx: ConfigurationContext, postCssPlugins: AcceptedPlugin[], preProcessors?: readonly webpack.RuleSetUseItem[]): webpack.RuleSetUseItem[];
