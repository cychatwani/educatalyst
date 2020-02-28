package tech.educatalyst.api.JpaRepositories.RedisRepos;

import java.util.Set;

public interface UniqueCourseKeyRepository {
    Set<String> getAllKeys();
    void addkeys(String tokens);
    boolean iskeyused(String token);
}
