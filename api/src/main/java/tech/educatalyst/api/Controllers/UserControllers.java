package tech.educatalyst.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import tech.educatalyst.api.JpaRepositories.RedisRepos.BlackListedTokenRepository;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.ApiModels.AuthenticationRequest;
import tech.educatalyst.api.Models.ApiModels.AuthenticationResponce;
import tech.educatalyst.api.Models.User;
import tech.educatalyst.api.Models.DataTransferObjects.UserDTO;
import tech.educatalyst.api.Services.EducatalystUserDetailsService;
import tech.educatalyst.api.Security.JwtUtill;

import javax.naming.AuthenticationException;

@RestController
@ResponseBody
public class UserControllers {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtill jwtUtill;
    @Autowired
    private EducatalystUserDetailsService educatalystUserDetailsService;
    @Autowired
    private BlackListedTokenRepository blackListedTokenRepository;
    @Autowired
    EducatalystUserDetailsService userDetailsService;

    @PostMapping("adduser")
    public ApiResponse<User> userRegistration(@RequestBody UserDTO userDTO){
        return new ApiResponse<>(HttpStatus.OK.value(),"User saved successfully.",userDetailsService.save(userDTO));
    }

    @GetMapping("blackListToken")
    public String logOutRequest(@RequestHeader("Authorization") String authHeader){
        String jwt = null;
        if(authHeader !=null && authHeader.startsWith("Bearer ")){
            // Leaving out Bearer and space :- "Bearer ";
            jwt = authHeader.substring(7);
        }
        blackListedTokenRepository.addToken(jwt);
        return "Now done";
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ApiResponse<AuthenticationResponce> register(@RequestBody AuthenticationRequest loginUser) throws AuthenticationException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginUser.getUserName(),loginUser.getPassword()
            ));
        }
        catch (Exception e){
            System.out.println(e);
            throw e;
        }
        final UserDetails user = educatalystUserDetailsService.loadUserByUsername(loginUser.getUserName());
        final String token = jwtUtill.generateToken(user);
        System.out.println(user.getAuthorities());
        return new ApiResponse<>(200, "success",new AuthenticationResponce(token));
    }

}

