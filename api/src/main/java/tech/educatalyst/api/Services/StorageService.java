package tech.educatalyst.api.Services;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tech.educatalyst.api.JpaRepositories.FileRepo;
import tech.educatalyst.api.Models.Files;

import java.util.List;


@Service
public class StorageService {
    @Autowired
    FileRepo fileRepo;

    public Boolean  storeImage(MultipartFile file, List<String> allowedExtensions){
        Files lastFile = fileRepo.findFirstByOrderByIdDesc();
        long fileId = 0;
        if(lastFile != null) {
             fileId = lastFile.getId() + 1;
        }
        String extenstion = FilenameUtils.getExtension(file.getOriginalFilename());
        if(!(allowedExtensions.contains(extenstion))){
            return false;
        }

    }
}
