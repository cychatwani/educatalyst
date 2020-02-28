package tech.educatalyst.api.Security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tech.educatalyst.api.Models.User;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class EducatalystUserDetails implements UserDetails {
    private String userName;
    private String password;
    private long userID;
    private boolean is_active;
    private String  user_role;
    private List<GrantedAuthority> authorities= Arrays.asList(new SimpleGrantedAuthority("user"));


    public EducatalystUserDetails(User user) {
        userName = user.getUserName();
        userID = user.getId();
        password = user.getPassword();
        is_active = user.isIs_active();
        user_role = user.getUser_role();
        authorities = Arrays.asList(new SimpleGrantedAuthority(user_role));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return is_active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
