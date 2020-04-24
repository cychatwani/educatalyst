export class Users {
  public  name: string;
  public email: string;
  public imageUrl: string;
  public accountType: string;
  public phone: string;
  public password: string;
  // tslint:disable-next-line:variable-name
  public user_role: string;

  constructor(name: string, email: string, imageUrl: string, accountType: string, phone: string, password: string, user_role: string) {
    this.name = name;
    this.email = email;
    this.imageUrl = imageUrl;
    this.accountType = accountType;
    this.phone = phone;
    this.password = password;
    this.user_role = user_role;
  }
}
