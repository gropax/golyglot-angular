module Api
  class LexicalEntriesController < ApplicationController
    respond_to :json

    before_action :set_lexical_entry, except: [:index]

    def index
      @lexical_entries = LexicalEntry.all
    end

    def show
    end

    private

      def set_lexical_entry
        @lexical_entry = LexicalEntry.find(params[:id])
      end
  end
end
