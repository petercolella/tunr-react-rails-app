import React, { Component } from 'react';
import axios from 'axios';

class Artist extends Component {
	constructor() {
		super();
		this.state = {
			artist: {},
			songs: []
		};
	}

	componentWillMount() {
		// const artistId = this.props.match.params.id;
		this._fetchArtistsAndSongs()
	}

	_fetchArtistsAndSongs = async () => {
		// try {
			// const response = await axios.get(`/api/artists/${artistId}/songs`)
			// await this.setState({artist: response.data.artist, songs: response.data.songs});
			// return response.data;
			const id = this.props.match.params.id;
			const res = await axios.get(`/api/artists/${id}`)
			this.setState({
				artist: res.data.artist,
				songs: res.data.songs
			})
		}
		// catch (err) {
		// 	await this.setState({error: err.message})
		// 	return err.message
		// }
	// }

	render() {
		return (
			<div>
				<img src={this.state.artist.photo_url} alt="" />
				<h1>{this.state.artist.name}</h1>
				{this.state.songs.map(song => (
					<div key={song.id}>
						<h4>{song.title}</h4>
						<audio controls src={song.preview_url}></audio>
					</div>
				))}
			</div>
		);
	}
}

export default Artist;