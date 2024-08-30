import React, {useEffect, useState} from "react";
import * as voteService from "../../services/voteService.js";

export default function Vote(values) {
	const [currentRating, setCurrentRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const [vote, setVote] = useState([]);
	const [hasVoted, setHasVoted] = useState(false);
	const [totalVotes, setTotalVotes] = useState(0);

	useEffect(() => {
		if (values.voteId && values.userId) {
			voteService.getById(values.voteId)
				.then(foundVote => {
					setVote(foundVote);
					const ratings = Object.values(foundVote.reviewers);
					const voted = Object.keys(foundVote.reviewers).some(userId => userId === values.userId);

					if (ratings.length > 0) {
						const totalRating = ratings.reduce((sum, value) => sum + value, 0);
						const averageRating = totalRating / ratings.length;
						setCurrentRating(averageRating);
						setTotalVotes(ratings.length);
					}

					setHasVoted(voted);
				})
				.catch(err => {
					console.error(err.message);
				});
		}
	}, [values.voteId, values.userId]);

	const handleRating = (rating) => {
		if (!hasVoted) {
			voteService.voting(values.voteId, values.userId, rating);
			setHasVoted(true);
			setTotalVotes(prevVotes => prevVotes + 1);
			vote.reviewers[values.userId] = rating;
			const ratings = Object.values(vote.reviewers);

			const totalRating = ratings.reduce((sum, value) => sum + value, 0);
			const averageRating = totalRating / ratings.length;
			setCurrentRating(averageRating);
			setTotalVotes(ratings.length);
		}
	};

	return (
		<div className="vote-container">
			<div className="star-rating">
				{[...Array(5)].map((_, index) => {
					const ratingValue = index + 1;
					const isFullStar = (hoverRating || currentRating) >= ratingValue;
					const isHalfStar = !isFullStar && (hoverRating || currentRating) >= ratingValue - 0.5;

					return (
						<React.Fragment key={ratingValue}>
							<input
								type="radio"
								id={`star${ratingValue}`}
								name="rating"
								value={ratingValue}
								onChange={() => handleRating(ratingValue)}
								disabled={hasVoted}
							/>
							<label
								htmlFor={`star${ratingValue}`}
								title={`${ratingValue} stars`}
								className={
									isFullStar ? 'full' : isHalfStar ? 'half' : ''
								}
								onMouseEnter={() => !hasVoted && setHoverRating(ratingValue)}
								onMouseLeave={() => !hasVoted && setHoverRating(0)}
							>
								★
							</label>
						</React.Fragment>
					);
				})}
			</div>
			<div className="average-rating">
				{currentRating.toFixed(1)}/5 ({totalVotes})
			</div>
		</div>
	);
}
