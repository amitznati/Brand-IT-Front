const paperBag = require('./bag_Paper.png');
const businessCard = require('./Business_Card.png');
const products = [
	{
		id: 1,
		name: 'Paper Bag',
		image: paperBag,
		productSize: {
			height: 30,
			width: 20
		},
		templatePosition: {
			height: 25,width: 19, x: 1, y: 1
		}
	},
	{
		id: 2,
		name: 'Business Card - front',
		image: businessCard,
		productSize: {
			height: 5.5,
			width: 8.5
		},
		templatePosition: {
			height: 5.4,width: 8.4, x: 0.05, y: 0.05
		}
	},
	{
		id: 3,
		name: 'Business Card - back',
		image: businessCard,
		productSize: {
			height: 5.5,
			width: 8.5
		},
		templatePosition: {
			height: 5.4,width: 8.4, x: 0.05, y: 0.05
		}
	}
];

export default products;