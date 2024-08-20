import React from 'react';

export default function ContentInfo() {
	return (
		<div className='container-content'>
			<div className='left-site'>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FWF2judaujT30K9sMf-tZFhMWpgP6xCemw&s'
					alt='Image'
				/>
				<div className='buttons'>
					<button>Edit</button>
					<button>Delete</button>
				</div>
				<p className='likes'>Likes: 123</p>
				<p className='favorite'>Favorite</p>
			</div>

			<div className='divider'></div>

			<div className='right-site'>
				<h1>Title</h1>
				<p>Genre: Action</p>
				<p>Year: 2024</p>
				<p>Rating: 8.5/10</p>
				<p>Rating: 8.5/10</p>
				<p>Rating: 8.5/10</p>
				<div className='content-description'>
					<p>
						This is a detailed description of the content. It provides an in-depth look at the plot,
						characters, and other interesting aspects of the movie. The description should be
						informative and engaging, capturing the attention of the reader. If the content is longer
						than this space allows, it will scroll within the fixed-size box, keeping the layout tidy
						and readable.
					</p>
				</div>
			</div>
		</div>
	);
}
