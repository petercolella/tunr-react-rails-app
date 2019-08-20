import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ArtistCard from './ArtistCard';

const ArtistListStyles = styled.div`
	margin: 20px 5%;
	width: 90%;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`;

class ArtistList extends Component {
	constructor(){
		super();
		this.state = {
			error: '',
			artists: []
		}
	}

	componentWillMount(){
		this._fetchArtists();
	}

	_fetchArtists = async () => {
		try {
			const res = await axios.get('/api/artists');
			await this.setState({artists: res.data});
			return res.data
		}
		catch (err) {
			console.log(err)
			await this.setState({error: err.message})
			return err.message
		}
	}

	render() {
		if (this.state.error){
			return <div>{this.state.error}</div>
		}
		return (
			<ArtistListStyles>
				{/* <h1>All Artists</h1> */}
				{this.state.artists.map((artist) => (
					<ArtistCard key={artist.id} artist={artist} />
					// <div key={artist.id}>
					// 	<Link to={`/artist/${artist.id}`} >{artist.name}</Link>
					// </div>
				))}
			</ArtistListStyles>
		)
	}
}

export default ArtistList;