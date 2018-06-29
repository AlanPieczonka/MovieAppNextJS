export default (list, ids) => {
	const genresObject = list.reduce((result, currentObject) => {
		result[currentObject.id] = currentObject.name;
		return result;
	}, {});

	return ids.map((id) => genresObject[id]);
};
