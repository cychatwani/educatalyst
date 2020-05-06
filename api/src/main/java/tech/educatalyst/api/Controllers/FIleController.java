package tech.educatalyst.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tech.educatalyst.api.Services.StorageService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FIleController {
    @Autowired
    StorageService storageService;

//    @PostMapping("upload")
//    public Boolean upload(@RequestParam MultipartFile file){
//        List allowedExtenstions = new ArrayList<String>();
//        allowedExtenstions.add("pdf");
//        allowedExtenstions.add("png");
//        allowedExtenstions.add("jpg");
//        return storageService.storeImage(file , allowedExtenstions);
//    }
}
