package com.strange.swgoh.swgohapp.data.mapper;

import com.strange.swgoh.swgohapp.data.dto.Mod;
import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class HotUtilsMapperTest {

    @Test
    public void testParseModList() throws IOException  {
        File file = new File("src/test/resources/hotutils/modList.html");
        try{

          Document modListDoc =  Jsoup.parse(FileUtils.readFileToString(file, StandardCharsets.UTF_8));
            List<Mod> result = HotUtilsMapper.mapMods(modListDoc);

            System.out.println("mods found: " + result.size());
            assert (result.size() == 494);

        }catch(IOException e){
            e.printStackTrace();
        }
    }

}
