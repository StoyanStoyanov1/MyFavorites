import React from 'react';
import noImage from '../../../public/images/noImage.jpg'

export default function ContentDetails() {
	return (
		<section className='section-content'>
			<div className='upercase'>
				<div className='content-photo'>
					<img
						src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&s' || noImage}
						alt='No Image'

					/>
				</div>
			</div>
			<div className='infocase'>
				<div className='content-title'>
					<p>Title</p>
				</div>
				<p>Genre</p>
				<p>Other</p>
				<p>Other2</p>
				<p>Other3</p>
			</div>

		</section>
	)
}