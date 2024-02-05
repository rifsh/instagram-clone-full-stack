export interface userSighnup {
    emailOrPhone: string;
    password: string;
    firstname: string;
    lastname: string;
    createdOn: Date;
    isVerified: boolean;
    isDeleted: boolean;
    isLogged: boolean;
    comparePassword(candidatePwsrd: string, dbPswrd: string): Promise<boolean>;
}
export interface userRegInterface {
    firstname: string;
    lastname: string;
}
export interface userLoginInterface {
    phoneNumber: string;
    password: string
}