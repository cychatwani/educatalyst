package tech.educatalyst.api.JpaRepositories.RedisRepos;

import java.util.List;
import java.util.Set;

public interface BlackListedTokenRepository {
    Set<String> getAllTokens();
    void addToken(String tokens);
    boolean isTokenBlackListed(String token);
}
