package tech.educatalyst.api.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("student/hello")
    public String helloStudent(){
        return "Hello Student";
    }
    @GetMapping("hello")
    public String authenticate(){
        return "AUTH World";
    }

}
