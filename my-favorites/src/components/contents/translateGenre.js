import translateGenreOptions from "../../utils/translator/translateGenreOptions.js";

const translateGenre = (genre, language) => {
	const genreOptions = translateGenreOptions.movie[language];
	if (genreOptions) {
		const genreOption = genreOptions.find(option => option.value === genre);
		return genreOption ? genreOption.label : genre;
	}
	return genre;
}

export default translateGenre;