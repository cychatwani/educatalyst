package tech.educatalyst.api.Models.ApiModels;

import tech.educatalyst.api.Models.User;

public class AuthenticationResponce {
    private final String token;
    private final User user;


    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }

    public AuthenticationResponce(String response_token, User user) {
        this.token = response_token;
        this.user = user;
    }
}
