export default (array, size = 4) => {
	return array.reduce((chunks, item, i) => {
		if (i % size === 0) {
			chunks.push([ item ]);
		} else {
			chunks[chunks.length - 1].push(item);
		}
		return chunks;
	}, []);
};
