module Api
  class PartsOfSpeechController < ApplicationController
    def index
      @parts_of_speech = PartOfSpeech.all
    end
  end
end
