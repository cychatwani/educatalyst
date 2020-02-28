package tech.educatalyst.api.Models.ApiModels;

public class AuthenticationRequest {
    private String UserName;
    private String Password;

    public AuthenticationRequest(){

    }
    public AuthenticationRequest(String userName, String password) {
        this.UserName = userName;
        this.Password = password;
    }

    public String getUserName() {
        return this.UserName;
    }

    public void setUserName(String userName) {
        this.UserName = userName;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
}
