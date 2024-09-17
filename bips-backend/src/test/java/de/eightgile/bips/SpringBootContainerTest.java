package de.eightgile.bips;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SpringBootContainerTest {

    @Test
    public void testContainerStartsProperly(){
        System.out.println("OK");
    }

}
