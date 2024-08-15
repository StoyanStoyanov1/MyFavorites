import {useState} from 'react';

export default function useSelected(initialValues) {
	const [selected, setSelected] = useState(initialValues);

	const onChangeSelected = (e) => {
		setSelected(e.target.value);
	};

	return {
		selected,
		onChangeSelected,
	}
}