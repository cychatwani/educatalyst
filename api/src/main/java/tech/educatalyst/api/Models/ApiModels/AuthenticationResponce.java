package tech.educatalyst.api.Models.ApiModels;

public class AuthenticationResponce {
    private final String token;


    public String getToken() {
        return token;
    }
    public AuthenticationResponce(String response_token) {
        this.token = response_token;
    }
}
