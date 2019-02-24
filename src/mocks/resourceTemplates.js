const paperBag = require('./products/paper_bag_bround.png');

function jsonCopy(src) {
	return JSON.parse(JSON.stringify(src));
}
const TEMPLATE = {
	
	id: 1,
	layouts: [
		{
			type: 'image',
			properties: {
				src: 'https://via.placeholder.com/600/56a8c2',
				height: 8,
				width: 8,
				x: 0,
				y: 0
			}
		},
	]
};

const PRODUCT = {
	id: 4,
	name: '',
	image: paperBag,
	productSize: {
		height: 10,
		width: 10
	},
	templateFrame: {
		height: 8,width: 8, x: 1, y: 1
	}
};

const ResourceTemplates = {
	PRODUCT: jsonCopy(PRODUCT),
	TEMPLATE: jsonCopy(TEMPLATE)
};

export default ResourceTemplates;