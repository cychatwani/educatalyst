package tech.educatalyst.api.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tech.educatalyst.api.JpaRepositories.RedisRepos.BlackListedTokenRepository;
import tech.educatalyst.api.Services.EducatalystUserDetailsService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFiltter extends OncePerRequestFilter {
    @Autowired
    EducatalystUserDetailsService educatalystUserDetailsService;
    @Autowired
    BlackListedTokenRepository blackTokenRepository;
    @Autowired
    JwtUtill jwtUtill;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {
        String userName = null;
        String jwt = null;

        final String authorizationHeader = request.getHeader("Authorization");
        if(authorizationHeader !=null && authorizationHeader.startsWith("Bearer ")){
            // Leaving out Bearer and space :- "Bearer ";
            jwt = authorizationHeader.substring(7);
            if(!(blackTokenRepository.isTokenBlackListed(jwt)))
                userName = jwtUtill.extractUserName(jwt);
        }
        if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.educatalystUserDetailsService.loadUserByUsername(userName);
            if(jwtUtill.ValidateToken(jwt,userDetails))
            {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken
                                (userDetails, null,userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
