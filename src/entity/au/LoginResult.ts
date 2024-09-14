import type LonginResultUser from '@/entity/au/LonginResultUser'

interface LoginResult {

   identifyKey: string

   users: Array<LonginResultUser>
}