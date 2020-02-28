package tech.educatalyst.api.JpaRepositories.RedisRepos;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Component;

import java.util.Set;
@Component
public class UniqueCourseKeyRepositoryImplimentation implements UniqueCourseKeyRepository{
    private String Key;
    private RedisTemplate<String, Set<String>> redisTemplate;
    private SetOperations setOperations;

    public UniqueCourseKeyRepositoryImplimentation(RedisTemplate<String, Set<String>> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.setOperations = redisTemplate.opsForSet();
        this.Key = "CourseKeys";
    }

    @Override
    public Set<String> getAllKeys() {
        return setOperations.members(Key);
    }

    @Override
    public void addkeys(String key) {
        setOperations.add(Key,key);
    }

    @Override
    public boolean iskeyused(String key) {
        return setOperations.isMember(Key,key);
    }
}
