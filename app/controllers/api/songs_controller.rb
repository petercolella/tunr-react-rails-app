class Api::SongsController < ApplicationController
	def index
      @songs = Song.all
      render json: @songs
    end

    def create
    @song = Song.create!(song_params)
    redirect_to song_path(@song)
  end

  def show
    @song = Song.find(params[:id])
    render json: @song
  end

  def update
    @song = Song.find(params[:id])
    @song.update!(song_params)
    redirect_to song_path(@song)
  end

  def destroy
    @song = Song.find(params[:id])
    @song.destroy
    redirect_to songs_path
  end

  private

  def song_params
    params.require(:song).permit(:name, :photo_url, :nationality)
  end
end
