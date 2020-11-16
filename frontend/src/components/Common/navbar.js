import React, { Component } from 'react'
import './navbar.css'

class Navbar extends Component {
	render() {
		return (
			<div className='row text-center border-bottom pt-4 pb-2 stickyNavBar bg-light'>
				<div className='col-md-2'>
					<div>
						<a
							href='/'
							className='text-secondary text-decoration-none'
						>
							<span>Dashboard</span>
						</a>
					</div>
				</div>
				<div className='col-md-2 offset-md-8'>
					<a
						href={
							'/welcome?redirect=' + encodeURIComponent(window.location.pathname)
						}
						className='text-secondary text-decoration-none'
					>
						<p>Sign in</p>
					</a>
				</div>
			</div>
		)
	}
}
//export Navbar Component
export default Navbar
