package com.example.messagingstompwebsocket.Model;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class PlayersList {
    private static PlayersList instance;
    private Set<Player> players;

    private PlayersList(){
        players= new HashSet<>();
    }

    public static  synchronized PlayersList getInstance(){
        if(instance == null){
            instance = new PlayersList();
        }
        return instance;
    }



    public Set<Player> getPlayers() {
        return players;
    }

    public void setPlayer(String playername , Double score,int playBoard[][] ){
        if(playername=="")
            return;
        for(Player player: players){
            if(player.getName().equals(playername)){
                player.setScore(score);
                player.setPlayBoard(playBoard);
                return;
            }
        }
        players.add(new Player(playername,score,playBoard));
    }

    @Override
    public String toString() {
        return "PlayersList{" +
                "players=" + players +
                '}';
    }
}
