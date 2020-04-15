package com.strange.swgoh.swgohapp.calculator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.strange.swgoh.swgohapp.data.swgoh.guild.Guild;
import com.strange.swgoh.swgohapp.data.swgoh.guild.Player;
import com.strange.swgoh.swgohapp.data.swgoh.mods.Mods;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ModsCalculatorTest {

    ObjectMapper objectMapper = new ObjectMapper();

    private static ModCalculatorCharacterResultsDto getCharacter(ModCalculatorResultsDto result, String name) {
        for (ModCalculatorCharacterResultsDto character : result.characterResults) {
            if (StringUtils.equals(character.name, name)) {
                return character;
            }
        }
        return null;
    }

    @Test
    public void testParseModList() throws IOException {
        File file = new File("src/test/resources/swgoh/mods/171299234.json");

        try {
            List<Mods> modsList = new ArrayList<>();

            Guild guild = objectMapper.readValue(new File("src/test/resources/swgoh/guild/259.json"), Guild.class);

            for (Player player : guild.getPlayers()) {

                modsList.add(objectMapper.readValue(new File("src/test/resources/swgoh/mods/" + player.getData().getAllyCode().toString() + ".json"), Mods.class));
            }


            ModCalculatorResultsDto result = ModsCalculator.calculateMods(modsList);

            ModCalculatorCharacterResultsDto hk = ModsCalculatorTest.getCharacter(result, "ZAALBAR");

            // PADMEAMIDALA
            // HK47
            // DARTHMALAK
            // KYLORENUNMASKED
            // ZAALBAR

            Object json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(hk);
            System.out.println(json);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
