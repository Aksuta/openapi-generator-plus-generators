import { CodegenOperation, CodegenOperationGroups } from '@openapi-generator-plus/types'

/**
 * See JavaJAXRSSpecServerCodegen.addOperationToGroup
 * @param operationInfo 
 * @param apiInfo 
 */
export function addToGroupsByPath(operationInfo: CodegenOperation, groups: CodegenOperationGroups) {
	let basePath = operationInfo.path
	
	const pos = basePath.indexOf('/', 1)
	if (pos > 0) {
		basePath = basePath.substring(0, pos)
	}
	if (basePath === '' || basePath === '/') {
		basePath = 'default'
	} else {
		/* Convert operation path to be relative to basePath */
		operationInfo.path = operationInfo.path.substring(basePath.length)
	}

	let groupName = basePath
	if (groupName.startsWith('/')) {
		groupName = groupName.substring(1)
	}

	if (!groups[groupName]) {
		groups[groupName] = {
			name: groupName,
			path: basePath,
			operations: [],
			consumes: [], // TODO in OpenAPIV2 these are on the document, but not on OpenAPIV3
			produces: [], // TODO in OpenAPIV2 these are on the document, but not on OpenAPIV3
		}
	}
	groups[groupName].operations.push(operationInfo)
}

export function addToGroupsByTag(operation: CodegenOperation, groups: CodegenOperationGroups) {
	let tag: string
	if (operation.tags && operation.tags.length) {
		tag = operation.tags[0]
	} else {
		tag = 'default'
	}

	if (!groups[tag]) {
		groups[tag] = {
			name: tag,
			path: '',
			operations: [],
			consumes: [], // TODO in OpenAPIV2 these are on the document, but not on OpenAPIV3
			produces: [], // TODO in OpenAPIV2 these are on the document, but not on OpenAPIV3
		}
	}
	groups[tag].operations.push(operation)
}

export function addToGroupsByTagOrPath(operation: CodegenOperation, groups: CodegenOperationGroups) {
	if (operation.tags && operation.tags.length) {
		return addToGroupsByTag(operation, groups)
	} else {
		return addToGroupsByPath(operation, groups)
	}
}
