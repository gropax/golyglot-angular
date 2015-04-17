module Api
  class PartsOfSpeechController < BaseController
    def index
      @parts_of_speech = PartOfSpeech.all
    end
  end
end
