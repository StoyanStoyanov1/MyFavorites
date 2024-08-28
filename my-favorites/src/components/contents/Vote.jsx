import React, {useState} from "react";

export default function Vote() {
	const [currentRating, setCurrentRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);

	return (
		<div className="star-rating">
			{[...Array(5)].map((_, index) => {
				const ratingValue = 5 - index; // 5 звезди отдясно наляво
				return (
					<React.Fragment key={ratingValue}>
						<input
							type="radio"
							id={`star${ratingValue}`}
							name="rating"
							value={ratingValue}
							// checked={ratingValue === currentRating}
							// onClick={() => handleRating(ratingValue)}
						/>
						<label
							htmlFor={`star${ratingValue}`}
							title={`${ratingValue} stars`}
							// style={{color: ratingValue <= (hoverRating || currentRating) ? 'gold' : '#ddd'}} // Промяна на цвета при hover или на текущия рейтинг
							// onMouseEnter={() => setHoverRating(ratingValue)} // Промяна при hover
							// onMouseLeave={() => setHoverRating(0)} // Нулиране при излизане
						>
							★
						</label>
					</React.Fragment>
				);
			})}
		</div>
	)
}