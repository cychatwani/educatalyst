package tech.educatalyst.api.Models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long users_id;
    @Column
    @NotBlank(message = "Name is mandatory")
    private String name;
    @Column
    @NotBlank(message = "Email is mandatory")
    private String email;
    @Column(name = "imageUrl")
    private String imageUrl;
    @Column(name = "accountType")
    private String accountType ;
    @Column
    private String phone;
    @Column
    private String password;
    @Column
    private String user_role;

    public String getUserName() {
        return this.email;
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

    public String getUser_role() {
        return user_role;
    }

    public void setUser_role(String user_role) {
        this.user_role = user_role;
    }

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    @Column
    private boolean is_active;

    public long getId() {
        return users_id;
    }

    public void setId(long id) {
        this.users_id = id;
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
}


