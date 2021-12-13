"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loader;
var _postcss = _interopRequireDefault(require("postcss"));
var _cssSyntaxError = _interopRequireDefault(require("./CssSyntaxError"));
var _warning = _interopRequireDefault(require("../../postcss-loader/src/Warning"));
var _plugins = require("./plugins");
var _utils = require("./utils");
var _stringifyRequest = require("../../../stringify-request");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function loader(content, map, meta) {
    const rawOptions = this.getOptions();
    const plugins = [];
    const callback = this.async();
    const loaderSpan = this.currentTraceSpan.traceChild('css-loader');
    loaderSpan.traceAsyncFn(async ()=>{
        let options;
        try {
            options = (0, _utils).normalizeOptions(rawOptions, this);
        } catch (error) {
            throw error;
        }
        const replacements = [];
        const exports = [];
        if ((0, _utils).shouldUseModulesPlugins(options)) {
            plugins.push(...(0, _utils).getModulesPlugins(options, this));
        }
        const importPluginImports = [];
        const importPluginApi = [];
        if ((0, _utils).shouldUseImportPlugin(options)) {
            const resolver = this.getResolve({
                conditionNames: [
                    'style'
                ],
                extensions: [
                    '.css'
                ],
                mainFields: [
                    'css',
                    'style',
                    'main',
                    '...'
                ],
                mainFiles: [
                    'index',
                    '...'
                ],
                restrictions: [
                    /\.css$/i
                ]
            });
            plugins.push((0, _plugins).importParser({
                imports: importPluginImports,
                api: importPluginApi,
                context: this.context,
                rootContext: this.rootContext,
                filter: (0, _utils).getFilter(options.import, this.resourcePath),
                resolver,
                urlHandler: (url)=>(0, _stringifyRequest).stringifyRequest(this, (0, _utils).getPreRequester(this)(options.importLoaders) + url)
            }));
        }
        const urlPluginImports = [];
        if ((0, _utils).shouldUseURLPlugin(options)) {
            const urlResolver = this.getResolve({
                conditionNames: [
                    'asset'
                ],
                mainFields: [
                    'asset'
                ],
                mainFiles: [],
                extensions: []
            });
            plugins.push((0, _plugins).urlParser({
                imports: urlPluginImports,
                replacements,
                context: this.context,
                rootContext: this.rootContext,
                filter: (0, _utils).getFilter(options.url, this.resourcePath),
                resolver: urlResolver,
                urlHandler: (url)=>(0, _stringifyRequest).stringifyRequest(this, url)
            }));
        }
        const icssPluginImports = [];
        const icssPluginApi = [];
        if ((0, _utils).shouldUseIcssPlugin(options)) {
            const icssResolver = this.getResolve({
                conditionNames: [
                    'style'
                ],
                extensions: [],
                mainFields: [
                    'css',
                    'style',
                    'main',
                    '...'
                ],
                mainFiles: [
                    'index',
                    '...'
                ]
            });
            plugins.push((0, _plugins).icssParser({
                imports: icssPluginImports,
                api: icssPluginApi,
                replacements,
                exports,
                context: this.context,
                rootContext: this.rootContext,
                resolver: icssResolver,
                urlHandler: (url)=>(0, _stringifyRequest).stringifyRequest(this, (0, _utils).getPreRequester(this)(options.importLoaders) + url)
            }));
        }
        // Reuse CSS AST (PostCSS AST e.g 'postcss-loader') to avoid reparsing
        if (meta) {
            const { ast  } = meta;
            if (ast && ast.type === 'postcss') {
                // eslint-disable-next-line no-param-reassign
                content = ast.root;
                loaderSpan.setAttribute('astUsed', 'true');
            }
        }
        const { resourcePath  } = this;
        let result;
        try {
            result = await (0, _postcss).default(plugins).process(content, {
                from: resourcePath,
                to: resourcePath,
                map: options.sourceMap ? {
                    prev: map ? (0, _utils).normalizeSourceMap(map, resourcePath) : null,
                    inline: false,
                    annotation: false
                } : false
            });
        } catch (error1) {
            if (error1.file) {
                this.addDependency(error1.file);
            }
            throw error1.name === 'CssSyntaxError' ? new _cssSyntaxError.default(error1) : error1;
        }
        for (const warning of result.warnings()){
            this.emitWarning(new _warning.default(warning));
        }
        const imports = [].concat(icssPluginImports.sort(_utils.sort)).concat(importPluginImports.sort(_utils.sort)).concat(urlPluginImports.sort(_utils.sort));
        const api = [].concat(importPluginApi.sort(_utils.sort)).concat(icssPluginApi.sort(_utils.sort));
        if (options.modules.exportOnlyLocals !== true) {
            imports.unshift({
                importName: '___CSS_LOADER_API_IMPORT___',
                url: (0, _stringifyRequest).stringifyRequest(this, require.resolve('./runtime/api'))
            });
        }
        const importCode = (0, _utils).getImportCode(imports, options);
        const moduleCode = (0, _utils).getModuleCode(result, api, replacements, options, this);
        const exportCode = (0, _utils).getExportCode(exports, replacements, options);
        return `${importCode}${moduleCode}${exportCode}`;
    }).then((code)=>{
        callback(null, code);
    }, (err)=>{
        callback(err);
    });
}

//# sourceMappingURL=index.js.map