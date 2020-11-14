import React, { Component } from 'react'
import './navbar.css'

class Navbar extends Component {
	render() {
		return (
			<div className='row text-center border-bottom pt-4 pb-2 stickyNavBar bg-light'>
				<div className='col-md-2'>
					<div>
						<a
							href='/food-supply-chain'
							className='text-secondary text-decoration-none'
						>
							<span>Dashboard</span>
						</a>
					</div>
				</div>
				<div className='col-md-2'>
					<div>
						<a
							href='/food-supply-chain-disaster'
							className='text-secondary text-decoration-none'
						>
							<span className='offset-md-2'>Disaster Data</span>
						</a>
					</div>
				</div>
				<div className='col-md-2'>
					<div>
						<a
							href='/food-supply-chain-disaster-state'
							className='text-secondary text-decoration-none'
						>
							<span className='offset-md-2'>Disasters per state</span>
						</a>
					</div>
				</div>
				<div className='col-md-2 offset-md-4'>
					<a
						href={
							'login?redirect=' + encodeURIComponent(window.location.pathname)
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
