package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Files;

public interface FileRepo extends JpaRepository<Files, Long> {
    Files findFirstByOrderByIdDesc();
    Files save(Files files);
}
