
import products from './products';
import templates from './templates';
const api = {
	products,
	templates
};

const apis = {
	PRODUCTS: 'products',
	TEMPLATES: 'templates'
};

const methods = {
	ALL: 'ALL',
	BYID: 'BYID',
	CREATE: 'CREATE',
	DELETE: 'DELETE',
	UPDATE: 'UPDATE'
};

function jsonCopy(src) {
	return JSON.parse(JSON.stringify(src));
}

const updateResource = (resourceName, payload) => {
	let data = api[resourceName].filter(r => r.id !== payload.id);
	data.push(payload);
	api[resourceName] = data;
	return payload.id;
};

const createResource = (resourceName, body) => {
	const data = api[resourceName];
	const id = data.reduce((crr, cur) => crr.id > cur.id) +1;
	body.id = id;
	data.push(body);
	return id;
};

const call = (resource,mothod,payload) => {
	if(!(api[resource] && api[resource].length > 0)) {
		return {};
	}
	switch(mothod) {
	case methods.ALL:
		return jsonCopy(api[resource]);
	case methods.BYID:
		return jsonCopy(api[resource].find(r => r.id === Number(payload)));
	case methods.CREATE:
		return createResource(resource,payload);
	case methods.UPDATE:
		return updateResource(resource,payload);
	default:
		return {};
	}
};
const mockService = {
	apis,
	methods,
	call,
	data: api
};

export default mockService;