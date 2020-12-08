package com.example.messagingstompwebsocket.Controller;



import com.example.messagingstompwebsocket.Model.Player;
import com.example.messagingstompwebsocket.Model.PlayersList;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ScoreController {
    @MessageMapping("/hello")
    @SendTo("/topic/Scores")
    public String greeting(Player message) throws Exception {
//        Thread.sleep(1000); // simulated delay

        PlayersList.getInstance().setPlayer(message.getName(), Double.valueOf(message.getScore()), message.getPlayBoard());


        //玩家列表->json
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = mapper.writeValueAsString(PlayersList.getInstance().getPlayers());



        return jsonInString;
}


}
