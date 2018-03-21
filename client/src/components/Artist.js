import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ArtistStyles = styled.div`
	img {
		max-height: 400px;
		width: auto;
	}
`;

class Artist extends Component {
	constructor() {
		super();
		this.state = {
			artist: {},
			songs: []
		};
	}

	componentWillMount() {
		this._fetchArtistAndSongData();
	}
	
	_fetchArtistAndSongData = async () => {
		try {
			const artistId = this.props.match.params.id;
			const res = await axios.get(`/api/artists/${artistId}`)
			await this.setState({
				artist: res.data.artist, 
				songs: res.data.songs
			})
		}
		catch (error) {
			console.log(error)
			await this.setState({error: error.message})
		}
	}

	render() {
		return (
			<ArtistStyles>
				<img src={this.state.artist.photo_url} alt="" />
				<h1>{this.state.artist.name}</h1>
				<h4>Nationality: {this.state.artist.nationality}</h4>
				<br />
				<h2>Songs</h2>
				{this.state.songs.map(song => (
					<div key={song.id}>
						<p>Title: {song.title} &mdash; Album: {song.album}</p>
						<audio controls src={song.preview_url}></audio>
						<br />
						<br />
					</div>
				))}
			</ArtistStyles>
		)
	}
}

export default Artist;