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
		},
		logged: {
			en: `To add ${values.title} to your favorites, you need to be logged in.`,
			de: `Um ${values.title} zu Ihren Favoriten hinzuzufügen, müssen Sie angemeldet sein.`,
			bg: `За да добавите ${values.title} към вашите любими, трябва да сте влезли в профила си.`
		}
	}
};

export default translateMessages;