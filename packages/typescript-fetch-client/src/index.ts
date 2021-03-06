import { CodegenGeneratorConstructor, CodegenGeneratorType } from '@openapi-generator-plus/types'
import path from 'path'
import { loadTemplates, emit } from '@openapi-generator-plus/handlebars-templates'
import typescriptGenerator, { CodegenOptionsTypeScript } from '@openapi-generator-plus/typescript-generator-common'

const createGenerator: CodegenGeneratorConstructor<CodegenOptionsTypeScript> = (context) => {
	const base = typescriptGenerator<CodegenOptionsTypeScript>({
		...context,
		loadAdditionalTemplates: async(hbs) => {
			await loadTemplates(path.resolve(__dirname, '../templates'), hbs)
		},
		additionalWatchPaths: () => {
			return [path.resolve(__dirname, '../templates')]
		},
		additionalExportTemplates: async(outputPath, doc, hbs, rootContext, state) => {
			const relativeSourceOutputPath = state.options.relativeSourceOutputPath
			await emit('api', path.join(outputPath, relativeSourceOutputPath, 'api.ts'), { ...doc, ...state.options, ...rootContext }, true, hbs)
			await emit('models', path.join(outputPath, relativeSourceOutputPath, 'models.ts'), { ...doc, ...state.options, ...rootContext }, true, hbs)
			await emit('runtime', path.join(outputPath, relativeSourceOutputPath, 'runtime.ts'), { ...doc, ...state.options, ...rootContext }, true, hbs)
			await emit('configuration', path.join(outputPath, relativeSourceOutputPath, 'configuration.ts'), { ...doc, ...state.options, ...rootContext }, true, hbs)
			await emit('custom.d', path.join(outputPath, relativeSourceOutputPath, 'custom.d.ts'), { ...doc, ...state.options, ...rootContext }, true, hbs)
			await emit('index', path.join(outputPath, relativeSourceOutputPath, 'index.ts'), { ...doc, ...state.options, ...rootContext }, true, hbs)
			await emit('README', path.join(outputPath, 'README.md'), { ...doc, ...state.options, ...rootContext }, true, hbs)
		},
		transformOptions: (config, options) => {
			const result: CodegenOptionsTypeScript = {
				...options,
			}
			return result
		},
		defaultNpmOptions: () => ({
			name: 'typescript-fetch-api',
			version: '0.0.1',
		}),
		defaultTypeScriptOptions: () => ({
			target: 'ES5',
			libs: ['$target', 'DOM'],
		}),
		generatorClassName: () => '@openapi-generator-plus/typescript-fetch-client-generator',
	})

	return {
		...base,
		generatorType: () => CodegenGeneratorType.CLIENT,
	}
}

export default createGenerator

