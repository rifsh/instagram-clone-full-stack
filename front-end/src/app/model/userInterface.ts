export interface UserSignupInterface {
    status: number;
    message: String;
    datas: {
        _id: string;
        email: string;
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
    _id: string;
    username: string;
    fullname: string;
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

export interface UserByIdInterface {
    message: string;
    datas: UserDetailInterface
}

export interface UserProfileDetailsInterace {
    userName: string;
    userBio: string;
    fullName: string;
    profileImg: string;
    followers: number;
    following: number;
}

export interface UserFollowersInterface {
    message: String;
    datas: {
        _id: string;
        phone: '+91';
        password: string;
        fullname: string;
        username: string;
        profilePic: string;
        followers: [{
            _id: string,
            username: string,
            fullname: string,
            profilePic: string,
            followers: [string],
            following: [string]
        }];
        following: [{
            _id: string,
            username: string,
            fullname: string,
            profilePic: string,
            followers: [string],
            following: [string]
        }];
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

export interface FollowersLiset {
    _id: string;
    profilePic: string;
    fullname: string;
    username: string;
    following?: [string]
}