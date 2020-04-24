package tech.educatalyst.api.Models.DataTransferObjects;

public class UserDTO {
    private long id;
    private String name;
    private String email;
    private String imageUrl;
    private String accountType ;
    private String phone;
    private String password;
    private String user_role;

    public String getUser_role() {
        return user_role;
    }

    @Override
    public String toString() {
        return "Id: "+getId()+
                " Name: "+getName()+
                " Email: "+getEmail()+
                " Image: "+getImageUrl()+
                " Phone: "+getPhone()+
                " password "+getPassword()+
                " AccountType "+getAccountType()+
                " UserRole "+getUser_role();
    }

    public void setUser_role(String user_role) {
        this.user_role = user_role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
