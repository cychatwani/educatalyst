package tech.educatalyst.api.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tech.educatalyst.api.JpaRepositories.UserRepository;
import tech.educatalyst.api.Models.User;
import tech.educatalyst.api.Models.DataTransferObjects.UserDTO;
import tech.educatalyst.api.Security.EducatalystUserDetails;


import java.util.Optional;


@Service
public class EducatalystUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;


    public User save(UserDTO user){
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setId(user.getId());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setAccountType(user.getAccountType());
        newUser.setImageUrl(user.getImageUrl());
        newUser.setPhone(user.getPhone());
        newUser.setName(user.getName());
        newUser.setUser_role(user.getUser_role());
        newUser.setIs_active(true);
        return userRepository.save(newUser);
    }



    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       // return new org.springframework.security.core.userdetails.User()
        Optional<User> user = userRepository.findByEmail(email);
        User user1;
        if (user.isPresent())
             user1 = user.get();
        else
            throw new UsernameNotFoundException("Not found!");
        return new EducatalystUserDetails(user1);
    }
}
