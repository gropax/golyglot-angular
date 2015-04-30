#!/bin/zsh

SESSION=$USER

tmux -2 new-session -d -s $SESSION

tmux new-window -t $SESSION:1 -n 'Test'

tmux send-keys "echo Bougle" C-m

tmux -2 attach-session -t $SESSION
