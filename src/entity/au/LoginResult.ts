import type LonginResultUser from '@/entity/au/LonginResultUser'

interface LoginResult {

   identityKey: string

   users: Array<LonginResultUser>
}