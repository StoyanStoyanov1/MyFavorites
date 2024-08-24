const translateMessages = (values) => {
	return  {
		addFavorite: {
			en: `Successfully added ${values?.title} to favorites.`,
			de: `Erfolgreich ${values?.title} zu den Favoriten hinzugefügt.`,
			bg: `Успешно добавихте ${values?.title} в любими`
		},
		removeFavorite: {
			en: `Successfully removed ${values?.title} from favorites.`,
			de: `Erfolgreich ${values?.title} aus den Favoriten entfernt.`,
			bg: `Успешно премахнахте ${values?.title} от любими`
		}
	}
};

export default translateMessages;