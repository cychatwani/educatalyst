package tech.educatalyst.api.Security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tech.educatalyst.api.Security.EducatalystUserDetails;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Service
public class JwtUtill {
    private String secret_key = "Secret";
    private Claims extractAllClaims(String token){
        Claims claims;
         try {
              claims = Jwts.parser()
                      .setSigningKey(secret_key)
                      .parseClaimsJws(token)
                      .getBody();
          }
          catch(Exception e){
              claims = null;
        }
        return claims;
    }
    public  <T>T extractClaim (String token, Function<Claims,T> claimsResolver){
        final  Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public long extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        return (long) claims.get("UserId");
    }
    public String extractUserName(String token){
        return extractClaim(token, Claims::getSubject);
    }
    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        claims.put("Authorities", userDetails.getAuthorities());
        return createToken(claims, userDetails.getUsername());
    }
    private boolean isTokenExpired(String token){
        return extractEpiration(token).before(new Date(System.currentTimeMillis()));
    }
    public Date extractEpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    private String createToken(Map<String, Object>claims, String subject ){
        long currentTime = System.currentTimeMillis();
        Date IssueTime = new Date(currentTime);
        Date ExpiryTime = new Date(currentTime + 1000*60*60*10);
        return Jwts.builder()
                .setClaims(claims).setSubject(subject)
                .setIssuedAt(IssueTime)
                .setExpiration(ExpiryTime)
                .signWith(SignatureAlgorithm.HS256,secret_key)
                .compact();
    }
    public  Boolean ValidateToken(String token, UserDetails userDetails){
        return ((extractUserName(token)).equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
