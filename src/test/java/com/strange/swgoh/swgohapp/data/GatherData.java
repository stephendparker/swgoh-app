package com.strange.swgoh.swgohapp.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.strange.swgoh.swgohapp.data.swgoh.guild.Guild;
import com.strange.swgoh.swgohapp.data.swgoh.guild.Player;
import com.strange.swgoh.swgohapp.data.swgoh.mods.Mods;

import java.io.*;

public class GatherData {


    public static void main(String[] args) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        Guild guild = gatherGuildFile(objectMapper, "259");

        for (Player player : guild.getPlayers()) {
            gatherModFile(objectMapper, player.getData().getAllyCode().toString());

            Thread.sleep(1000);
        }

        return;

    }

    private static Guild gatherGuildFile(ObjectMapper objectMapper, String guildCode) throws IOException {
        Guild guild = SwgohGGDataService.guildMapped(guildCode);
        Object json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(guild);

        File fileModJsonFile = new File("src/test/resources/swgoh/guild/" + guildCode + ".json");

        fileModJsonFile.createNewFile(); // if file already exists will do nothing

        BufferedOutputStream bos = null;
        FileOutputStream oFile = null;

        try {
            oFile = new FileOutputStream(fileModJsonFile, false);
            bos = new BufferedOutputStream(oFile);
            bos.write(((String) json).getBytes());
        } catch (FileNotFoundException fnfe) {
            System.out.println("File not found" + fnfe);
        } catch (IOException ioe) {
            System.out.println("Error while writing to file" + ioe);
        } finally {
            try {
                if (bos != null) {
                    bos.flush();
                    bos.close();
                    oFile.flush();
                    oFile.close();
                }
            } catch (Exception e) {
                System.out.println("Error while closing streams" + e);
            }
        }
        return guild;
    }

    private static void gatherModFile(ObjectMapper objectMapper, String allyCode) throws IOException {
        Mods modsList = SwgohGGDataService.playerModsMapped(allyCode);
        Object json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(modsList);


        File fileModJsonFile = new File("src/test/resources/swgoh/mods/" + allyCode + ".json");
        fileModJsonFile.createNewFile(); // if file already exists will do nothing
        FileOutputStream oFile = new FileOutputStream(fileModJsonFile, false);
        oFile.write(((String) json).getBytes());
        oFile.flush();
        oFile.close();
    }
}
