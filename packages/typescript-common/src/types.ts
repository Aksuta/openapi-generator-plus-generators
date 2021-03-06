import { JavaLikeOptions } from '@openapi-generator-plus/java-like-generator-helper'

/**
 * Options specific to the template that the user can provide to the code generation process.
 */
export interface CodegenOptionsTypeScript extends JavaLikeOptions {
	relativeSourceOutputPath: string
	npm?: NpmOptions
	typescript?: TypeScriptOptions
	customTemplatesPath?: string
}

export interface TypeScriptOptions {
	target: string
	libs: string[]
}

export interface NpmOptions {
	name: string
	version: string
	repository?: string
	private?: boolean
}
