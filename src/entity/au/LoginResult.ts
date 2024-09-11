import type LonginResultUser from '@/entity/au/LonginResultUser'


export default class LoginResult {

  constructor(identityKey: string, users: Array<LonginResultUser>) {
    this.identityKey = identityKey
    this.users = users
  }

  public identityKey: string

  public users: Array<LonginResultUser>
}