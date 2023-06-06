enum AccountEnum {
  Patron = "patron",
  Staff = "staff",
  Administrator = "administrator"

}

export interface AccountParams {
  username: string,
  password: string,
  permission: AccountEnum
}

export interface ResAccountParams {
  success: boolean
}