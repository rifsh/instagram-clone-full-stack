export interface UserSignupInterface {
    status: number;
    message: String;
    datas: {
        _id: string;
        phone: '+91';
        password: string;
        fullname: string;
        username: string;
        profilePic: string;
        followers: [string];
        following: [string];
        dateOfBirth: Date;
        gender: string;
        links: string
        bio: string;
        createdOn: Date;
        isVerified: boolean;
        isDeleted: boolean;
        isLogged: boolean;
    }
}

export interface UserDetailInterface {
    username: string;
    profilePic: string;
    followers: [string];
    following: [string];
    dateOfBirth: Date;
    gender: string;
    links: string
    bio: string;
    createdOn: Date;
    isVerified: boolean;
    isDeleted: boolean;
    isLogged: boolean;
}