package tech.educatalyst.api.JpaRepositories.RedisRepos;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Component;
import tech.educatalyst.api.JpaRepositories.RedisRepos.BlackListedTokenRepository;

import java.util.Set;
@Component
public class BlackListedTokenRepositoryImplimentation implements BlackListedTokenRepository {
    private String Key;
    private RedisTemplate<String, Set<String>> redisTemplate;
    private SetOperations setOperations;

    public BlackListedTokenRepositoryImplimentation(RedisTemplate<String, Set<String>> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.setOperations = redisTemplate.opsForSet();
        this.Key = "BlackListedToken";
    }

    public Set<String> getAllTokens() {
        return setOperations.members(Key);
    }

    public void addToken(String tokens) {
        setOperations.add(Key,tokens);
    }

    public boolean isTokenBlackListed(String token) {
        return setOperations.isMember(Key,token);
    }


}
